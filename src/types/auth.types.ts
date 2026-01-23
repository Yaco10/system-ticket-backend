import { Request } from "express"

export interface AuthRequest extends Request {
    userId?: string;
}

export interface AuthenticatedRequest extends Request {
    userId: string;
}

export type PayLoadJwt = {
    userId: string
}