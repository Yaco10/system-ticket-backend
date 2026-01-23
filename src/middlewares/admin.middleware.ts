import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { assertAuthenticated } from "../types/authGuards";

export async function requireAdmin(req: Request, res: Response, next: NextFunction){
    assertAuthenticated(req)

    try{
        const user = await User.findById(req.userId)
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.admin = true;

        next()

    }
    catch{
        return res.status(404).json({message: "User not found"})
    }

    


}