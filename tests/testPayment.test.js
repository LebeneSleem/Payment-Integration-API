const request = require("supertest");
const express = require("express");
const { initiatePayment, verifyPayment } = require("../controllers/paymentControllers");
const axios = require("axios");

// Mock Axios
jest.mock("axios");

const app = express();
app.use(express.json());

// routes for testing
app.post("/payments/initiate", initiatePayment);
app.get("/payments/:reference", verifyPayment);

describe("Payment API Tests", () => {
  describe("POST /payments/initiate", () => {
    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/payments/initiate").send({
        customer_name: "Lebene Sleem",
        customer_email: "lebenesleem@gmail.com",
        amount: 5000,
        // Missing customer_phone
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: "error",
        message: "All fields (customer_name, customer_email, amount, customer_phone) are required.",
      });
    });

    it("should initiate payment successfully", async () => {
      const mockResponse = {
        data: {
          data: {
            reference: "test123",
            authorization_url: "https://paystack.com/payment/test123",
          },
        },
      };

      axios.post.mockResolvedValue(mockResponse);

      const response = await request(app).post("/payments/initiate").send({
        customer_name: "Lebene Sleem",
        customer_email: "lebenesleem@gmail.com",
        amount: 5000,
        customer_phone: "1234567890",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        payment: {
          reference: "test123",
          amount: 5000,
          customer_name: "Lebene Sleem",
          customer_email: "lebenesleem@gmail.com",
          customer_phone: "1234567890",
          status: "pending",
          link: "https://paystack.com/payment/test123",
        },
        status: "success",
        message: "Payment initiated successfully.",
      });
    });

    it("should handle errors during payment initiation", async () => {
      axios.post.mockRejectedValue(new Error("Paystack API Error"));

      const response = await request(app).post("/payments/initiate").send({
        customer_name: "Lebene Sleem",
        customer_email: "lebenesleem@gmail.com",
        amount: 5000,
        customer_phone: "1234567890",
      });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Failed to initiate payment.");
    });
  });

  describe("GET /payments/:reference", () => {
    it("should return 400 if reference is not provided", async () => {
      const response = await request(app).get("/payments/");

      expect(response.status).toBe(404); // 404 because the route expects a reference
    });

    it("should verify payment successfully", async () => {
      const mockResponse = {
        data: {
          data: {
            reference: "test123",
            amount: 500000,
            metadata: {
              custom_fields: [
                { value: "Lebene Sleem" },
                { value: "1234567890" },
              ],
            },
            customer: { email: "lebenesleem@gmail.com" },
            status: "success",
          },
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const response = await request(app).get("/payments/test123");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        payment: {
          reference: "test123",
          amount: 5000, 
          customer_name: "Lebene Sleem",
          customer_phone: "1234567890",
          customer_email: "lebenesleem@gmail.com",
          status: "success",
        },
        status: "success",
        message: "Payment details retrieved successfully.",
      });
    });

    it("should handle errors during payment verification", async () => {
      axios.get.mockRejectedValue(new Error("Paystack API Error"));

      const response = await request(app).get("/payments/test123");

      expect(response.status).toBe(404);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Payment verification failed.");
    });
  });
});