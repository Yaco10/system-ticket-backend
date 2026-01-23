import { Request, Response, NextFunction } from "express";
import { AuthRequest, PayLoadJwt } from "../types/auth.types";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JWT_SECRET } from "../config/env";



export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    try{

        if(!header?.startsWith("Bearer ")) {
            throw new UnauthorizedError()
        }

        const token = header.slice("Bearer ".length);
        const secret = JWT_SECRET
    
        const payload = jwt.verify(token, secret) as PayLoadJwt

        req.userId = payload.userId;

        next()
    }
    catch (err){
        next(err)
    }
    


}