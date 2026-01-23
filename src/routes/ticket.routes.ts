import { Router } from "express";
import { getTickets, createTicket } from "../controllers/ticket.controller"
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireAuth , getTickets)
router.post("/", requireAuth, createTicket) 

export default router