import { Router } from "express";
import categoriesRouer from "./categoriesRouter.js";
import customersRouter from "./customersRouter.js";
import gamesRouter from "./gamesRouter.js";

const router = Router()

router.use(categoriesRouer)
router.use(gamesRouter)
router.use(customersRouter)

export default router;