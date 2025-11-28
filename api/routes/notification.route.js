import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
} from "../controllers/Notification.controller.js";

const router = express.Router();

router.post("/create", createNotification);
router.get("/:userId", getUserNotifications);
router.put("/read/:id", markAsRead);

export default router;
