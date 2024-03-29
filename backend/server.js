import path from "path"; //path module
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT;
connectDB();
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cookie parser middleware
app.use(cookieParser());

//path for product routes (in routes / + /:id)
app.use("/api/products", productRoutes);
//path for users routes (in routes / + /:id)
app.use("/api/users", userRoutes);
//path for order routes (in routes / + /:id)
app.use("/api/orders", orderRoutes);
//img upload route
app.use("/api/upload", uploadRoutes);
//Paypal route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//uploads folder we want to make static...to be able to access it
const __dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//======TEST
//======if is in production
if (process.env.NODE_ENV === "production") {
  //set static folder - react build folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  //any route that is not api will be redirected to index.html (witch is in frontend, build)
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
  //======else if is not in production (we use react dev server)
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
