// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
////////////////////////////////////////////////
// adding "type": "module" in our package.json will
// allow us to use imports instead of common js
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

// allows to use environment variables stored in .env
dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `### Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
      .yellow.bold
  )
);
