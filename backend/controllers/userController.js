import { Error } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// && (await user.matchPassword(password))
//1
//@desc Auth user & get token
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  //request body: email and password
  const { email, password } = req.body;

  //console.log("login");
  //we check if is the user with that EMAIL
  const user = await User.findOne({ email });

  //PASSWORD validation (comparing is in userModel.js)
  //  ( userSchema.methods.matchPassword = async function (enteredPassword) {
  //     return await bcrypt.compare(enteredPassword, this.password);
  //   };)
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
  // If the new user is successfully created, generate a JWT token and set it as an HTTP-only cookie
  if (user) {
    generateToken(res, user._id);
    // Send a 200 OK response with the user's information (excluding the password)
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
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user's name and email if provided in the request body; otherwise, keep the existing values
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // If a new password is provided in the request body, update the user's password
    if (req.body.password) {
      user.password = req.body.password;
    }
    // Save the updated user object to the database
    const updatedUser = await user.save();

    // Send a 200 OK response with the updated user's information (excluding the password)
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // If no user is found with the provided user ID, send a 404 Not Found response with an error message
    res.status(404);
    throw new Error("User not found");
  }
});

//6 = ADMIN
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//7 = ADMIN
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//8 = ADMIN
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//9 = ADMIN
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
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
