import { Ticket } from "../models/ticket.model";
import { Types } from "mongoose";
import { InputTicket } from "../dto/ticket.dto";


export async function getUserTicket(userId: string) {
    return await Ticket.find({ createdBy: new Types.ObjectId(userId) }).lean();
    
}

export async function createTicket(input: InputTicket, userId: string) {
    if (!userId) {
        throw new Error("User no especificado");
    }

    if (!Types.ObjectId.isValid(userId)) {
        throw new Error("userId inválido");
    }

    if (!input.title?.trim()) {
        throw new Error("Título no especificado");
    }

    const ticket = await Ticket.create({
        title: input.title.trim(),
        description: input.description,
        createdBy: new Types.ObjectId(userId),
    });

  return ticket;
}