import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
//IMPORT
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //user inserted
    const createUsers = await User.insertMany(users);
    //admin
    const adminUser = createUsers[0]._id;
    //var with all the products and admin
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    //insert all the products in DB
    await Product.insertMany(sampleProducts);

    //color=green.inverse
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

//DESTROY
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// console.log(process.argv[2]);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
