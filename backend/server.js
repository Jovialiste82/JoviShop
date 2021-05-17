// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
////////////////////////////////////////////////
// adding "type": "module" in our package.json will
// allow us to use imports instead of common js
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// allows to use environment variables stored in .env
dotenv.config();

connectDB();

const app = express();

// // Middleware example
// app.use((req, res, next) => {
//   console.log("req.originalUrl");
//   console.log(req.originalUrl);
//   next();
// });

// Middleware allowing req.body to be parsed
// allows us to accept JSON data in the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `### Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
      .yellow.bold
  )
);
