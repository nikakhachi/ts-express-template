import { Router, Request, Response } from "express";
import { authenticationGuard } from "../../middleware/authentication.guard";

const router = Router();

router.get("/healthcheck", (req: Request, res: Response) => res.json("Healthy !"));

router.get("/validate-user", authenticationGuard, (req: Request, res: Response) => res.json("Validated"));

export default router;
