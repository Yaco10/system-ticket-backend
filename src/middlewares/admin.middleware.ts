import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { assertAuthenticated } from "../types/authGuards";
import { NotFoundError } from "../errors/NotFoundError";
import { ForbiddenError } from "../errors/ForbbidenError";

export async function requireAdmin(req: Request, res: Response, next: NextFunction){
    try{
        assertAuthenticated(req)

        const user = await User.findById(req.userId)
        
        if (!user) {
            throw new NotFoundError()
        }

        if (user.role !== "admin") {
            throw new ForbiddenError()
        }

        next()
    }
    catch(err){
        return next(err)
    }

}