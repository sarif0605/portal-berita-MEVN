import jwt from "jsonwebtoken";
import User from "../models/User";

export const authMiddleware = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    return next(
      res.status(401).json({
        message: "Unauthorized",
      })
    );
  }
  let decode;

  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        message: "Unauthorized",
      })
    );
  }
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      res.status(401).json({
        message: "Unauthorized",
      })
    );
  }
  req.user = user;
  next();
};

export const permissionUsers = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(401).json({
          message: "tidak bisa akses",
        })
      );
    }
    next();
  };
};
