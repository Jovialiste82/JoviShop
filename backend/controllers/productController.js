import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
// Brad: routes should just point to controller methods
// So we'll move the logic from routes files to controller files

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product not found" });
    // because of our custom error handling, we can just throw an error
    res.status(404);
    // if we omit to set 404, it will default to 500
    throw new Error("Error (0452) - Product not found");
  }
});

export { getProducts, getProductById };
