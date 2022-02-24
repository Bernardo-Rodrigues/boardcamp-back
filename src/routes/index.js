import { Router } from "express";
import categoriesRouer from "./categoriesRouter.js";
import gamesRouter from "./gamesRouter.js";

const router = Router()

router.use(categoriesRouer)
router.use(gamesRouter)

export default router;