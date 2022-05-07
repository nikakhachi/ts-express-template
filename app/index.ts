import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import customizeResponse from "./customizeResponse";
import routes from "../routes";
import { TypeCustomError } from "../utils/errors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(customizeResponse);

app.get("/healthcheck", (req: Request, res: Response) => res.json("Healthy !"));

app.use("/api", routes);

app.use((err: TypeCustomError, req: Request, res: Response) => {
  return res.status(err.status).json({ status: err.status, error: err.message });
});

export default app;
