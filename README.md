A basic RESTful API that allows small businesses to accept payments from customers using Paystack payment gateway. Also focuses on minimal customer information (name, email, amount and telephone number).
The API is implemented without user authentication, uses versioning, and automate testing and deployment through CI/CD.


## Local Setup and Running Tests
# Local Development Prerequisites
1. Install Node.js (v16 or higher): Follow the installation guide on Node.js official website.

2. Install npm: npm comes with Node.js, so it's installed automatically when you install Node.js.

3. Clone the repository: Run the following command to clone the project:
    git clone https://github.com/LebeneSleem/Payment-Integration-API.git

4. Navigate to the project directory:
    cd Payment-Integration-API

5. Install dependencies: Run the following command to install the required dependencies:
    npm install

6. Create a .env file: Create a .env file in the root directory with the following content:
    PORT=2012
    PAYSTACK_SECRET_KEY=<YOUR_PAYSTACK_SECRET_KEY>  # Replace with your actual Paystack secret key
    PAYSTACK_BASE_URL=https://api.paystack.co

7. Start the Service Locally
    Run the development server: Start the service by running:
    npm start

8. Access the service: You can access the service at:
    http://localhost:2012


# Run Tests with Jest
Run the tests: To run the tests, execute the following:
npm test

Expected output:
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.301 s


# Access the Deployed API
You can access the deployed API at:
    https://payment-integration-api-1.onrender.com/


# Test the API with Postman
1. Initiate Payment (POST request)
URL: https://payment-integration-api-1.onrender.com/api/v1/payments
Body:
json
{
  "customer_name": "Jane Doe",
  "customer_email": "jane.doe@example.com",
  "amount": 5000.00,
  "customer_phone": "0541234567"
}

2. Verify Payment (GET request)
URL: http://localhost:2012/api/v1/payments/verify/<reference>
Replace <reference> with the payment reference from the POST request.
