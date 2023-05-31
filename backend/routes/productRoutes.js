import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel.js";
//adding 'async handler' cos mongoose methods are async
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //fetching products from DB
    const products = await Product.find({});
    res.json(products);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: "Product not found" });
  })
);
export default router;
