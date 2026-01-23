import { Request, Response, NextFunction } from "express";
import { AuthRequest, PayLoadJwt } from "../types/auth.types";
import jwt from "jsonwebtoken";



export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if(!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing token" });
    }

    const token = header.slice("Bearer ".length);
    const secret = process.env.JWT_SECRET;
    
     if (!secret) {
        return res.status(500).json({ message: "JWT secret not configured" });
    }
    try{
        const payload = jwt.verify(token, secret) as PayLoadJwt

        req.userId = payload.userId;

        next()
    }
    catch{
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    


}