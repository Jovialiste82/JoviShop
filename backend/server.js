// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
////////////////////////////////////////////////
// adding "type": "module" in our package.json will
// allow us to use imports instead of common js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware allowing req.body to be parsed
// allows us to accept JSON data in the body
app.use(express.json());

// to be removed when ready to deploy
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// To mimic __dirname which only works with common JS
const __dirname = path.resolve();

// Let's make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Prepare for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

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
