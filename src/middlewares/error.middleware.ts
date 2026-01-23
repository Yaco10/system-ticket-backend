import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  // version base falta refinar los errores
  return res.status(500).json({
    error: "Internal Server Error",
  });
}