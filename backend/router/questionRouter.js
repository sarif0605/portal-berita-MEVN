import express from "express";
import { authMiddleware, permissionUsers } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", authMiddleware, permissionUsers("user"), CreateData);
router.get("/", GetData);
router.get("/:id", GetDataById);
router.put("/:id", UpdateData);
router.delete("/:id", DeleteData);
export default router;
