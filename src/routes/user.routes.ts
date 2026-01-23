import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import { getMe, editMe, getUsers, editUserRole } from "../controllers/user.controller";

const router = Router();

router.get("/me", requireAuth, getMe)
router.patch("/me", requireAuth, editMe)
router.get("/", requireAuth, requireAdmin, getUsers) 
router.patch("/:id/role",requireAuth, requireAdmin, editUserRole) 

export default router