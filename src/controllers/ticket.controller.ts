import { Request, Response, NextFunction } from "express";
import * as ticketService from "../services/ticket.services"
import { assertAuthenticated} from "../types/authGuards";
import { AuthRequest } from "../types/auth.types";

export async function getTickets(req: AuthRequest, res: Response, next: NextFunction) {
  //Refuerza el tipado
   assertAuthenticated(req)
  
  try {
    const result = await ticketService.getUserTicket(req.userId);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function createTicket(req:AuthRequest, res: Response, next: NextFunction) {
  assertAuthenticated(req)

  try{
    const result = await ticketService.createTicket(req.body, req.userId)
    return res.status(201).json(result)
  } catch(err) {
    return next(err)
  }
  
}