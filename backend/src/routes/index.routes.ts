import { Router } from "express";
// indexWelcome
import { indexWelcome } from "../controllers/index.controller";

const router = Router();

router.route("/").get(indexWelcome);

export default router;
