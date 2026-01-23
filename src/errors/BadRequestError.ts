import { AppError } from "./AppError";

export class BadRequestErrore extends AppError {
    constructor(message = "Bad request") {
    super(message, 400)
  }
}