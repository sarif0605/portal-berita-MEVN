import asyncHandler from "../middleware/asyncHandle";
import User from "../models/User";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export const RegisterUser = asyncHandler(async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role,
  });
  createSendToken(user, 201, res);
});

export const LoginUser = asyncHandler(async (req, res) => {
  // validasi jika email passowrd tidak diisi
  if (!req.body.email && !req.body.password) {
    res.status(400);
    throw new Error("Please add email and password");
  }
  const user = await User.findOne({ email: req.body.email });
  if (user && (await user.comparePassword(req.body.password))) {
    createSendToken(user, 200, res);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: 0 });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
