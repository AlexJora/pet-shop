import { Error } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// && (await user.matchPassword(password))
//1
//@desc Auth user & get token
//@route POST/api/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("login");
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
    generateToken(res, user_id);

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
  console.log("logout");
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

//4
//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//5
//@desc Update user profile
//@route PUT/api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
