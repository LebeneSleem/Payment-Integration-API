const express = require("express");
const bodyParser = require("body-parser");
// const routes = require("../routes/paymentRoutes");
const routes = require("../routes/paymentRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2012;

// Middleware
app.use(bodyParser.json());
app.use("/api/v1", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
