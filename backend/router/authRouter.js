import express from "express";
const router = express.Router();
import {
  RegisterUser,
  LoginUser,
  getUser,
  logout,
} from "../controller/authController";
import { authMiddleware } from "../middleware/authMiddleware";
router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.post("/logout", authMiddleware, logout);
router.get("/getUser", authMiddleware, getUser);
export default router;
