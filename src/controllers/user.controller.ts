import { Request, Response, NextFunction } from "express";
import { assertAuthenticated,  } from "../types/authGuards";
import * as userService from "../services/user.services"
import { Role } from "../types/user.types";
import { AuthRequest } from "../types/auth.types";


export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try{

        assertAuthenticated(req)

        const result = await userService.getMe(req.userId)
        return res.status(201).json(result)
    }
    catch(err){
        next(err)
    }

}

export async function editMe(req: AuthRequest, res: Response, next: NextFunction){
    try {

        assertAuthenticated(req)

        const result = await userService.editMe(req.body, req.userId)
        return res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}

export async function getUsers(req: AuthRequest , res: Response, next: NextFunction){
    try{

        assertAuthenticated(req)

        const result = await userService.getUsers()
        return res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}

export async function editUserRole(req: AuthRequest, res: Response, next: NextFunction){
    try{
        assertAuthenticated(req)

        const { id } = req.params;
        const role = req.body.role as Role
        const { userId } = req

        if (role !== "user" && role !== "admin") {
            return res.status(400).json({ message: "Invalid role" });
        }

        const result = await userService.editUserRole(id, role, userId)
        return res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}