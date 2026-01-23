import { Schema, model, Types } from "mongoose";

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "open" },
    createdBy: { type: Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Ticket = model("Ticket", ticketSchema);
