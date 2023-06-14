import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// && (await user.matchPassword(password))
//1
//@desc Auth user & get token
//@route POST/api/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //Set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//2
//@desc Register user
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if user exists
  const userExists = await User.findOne({ email });
  //if exists throw error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //if doesn't exists we create one
  const user = await User.create({
    name,
    email,
    password,
  });
  //if we created the new user
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  //next we need to hash the password (we do the encryption in the model)
});

//3
//@desc Logout user / clear cookies
//@route POST/api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

//4
//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//5
//@desc Update user profile
//@route PUT/api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//6
//@desc Get users
//@route GET/api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//7
//@desc Get user by id
//@route GET/api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get users  by id");
});

//8
//@desc Delete users
//@route DELETE/api/users/:id
//@access Private/:id
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//9
//@desc Update user
//@route PUT/api/users/:id
//@access Private/:id
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
