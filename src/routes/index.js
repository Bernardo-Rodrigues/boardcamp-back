import { Router } from "express";
import categoriesRouer from "./categoriesRouter.js";

const router = Router()

router.use(categoriesRouer)

export default router;