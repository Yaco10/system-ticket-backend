import express from "express";
import cors from "cors"

import apiRouter from "./routes/index"
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notfound.error";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}