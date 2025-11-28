import express from "express";
import {
  createSupportTicket,
  listSupportTickets,
  askAssistant,
} from "../controllers/support.controller.js";

const router = express.Router();

router.post("/tickets", createSupportTicket);
router.get("/tickets", listSupportTickets);
router.post("/assistant", askAssistant);

export default router;

