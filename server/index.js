const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const { logger } = require("./middleware/logger.js");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// request logging
app.use(morgan("dev"));

// custom logger
app.use(logger);

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port : ${PORT}`);
});
