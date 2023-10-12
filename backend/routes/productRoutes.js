import express from "express";
// Create an instance of Express Router
const router = express.Router();
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
