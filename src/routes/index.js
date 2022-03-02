import { Router } from "express";
import categoriesRouer from "./categoriesRouter.js";
import customersRouter from "./customersRouter.js";
import gamesRouter from "./gamesRouter.js";
import rentalsRouter from "./rentalsRouter.js";

const router = Router()

router.use(categoriesRouer)
router.use(gamesRouter)
router.use(customersRouter)
router.use(rentalsRouter)

export default router;