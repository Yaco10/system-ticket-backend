import { Router } from "express";
import authRouter from "../routes/auth.routes"
import ticketRoutes from "../routes/ticket.routes"
import userRoutes from "../routes/user.routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/ticket", ticketRoutes)
router.use("/user", userRoutes)

export default router