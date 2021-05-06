// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
////////////////////////////////////////////////
// adding "type": "module" in our package.json will
// allow us to use imports instead of common js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";

// allows to use environment variables stored in .env
dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  // json method will convert js object into json format
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `### Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
