import { Router } from "express";
import { insertRental, listRentals } from "../controllers/rentalsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals)
rentalsRouter.post("/rentals", validateSchemaMiddleware, insertRental)

export default rentalsRouter;