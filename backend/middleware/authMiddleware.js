import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//1.Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //Read the JWT from the cookie by accessing req.cookies.jwt.
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT to get the user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find the user associated with the decoded token and exclude the password field
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//2.Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
