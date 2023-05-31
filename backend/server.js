import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

//import product routes
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT;
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running....");
});
//path for product routes (in routes / + /:id)
app.use("/api/products", productRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
