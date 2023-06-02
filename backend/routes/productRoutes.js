import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
//adding 'async handler' cos mongoose methods are async
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
export default router;
