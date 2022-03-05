import { Router, Request, Response } from "express";

const router = Router();

router.use("/healthcheck", (req: Request, res: Response) => res.json("Healthy !"));

export default router;
