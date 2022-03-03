import { Router } from "express";
import { insertRental, listRentals, removeRental, updateRental } from "../controllers/rentalsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals)
rentalsRouter.post("/rentals", validateSchemaMiddleware, insertRental)
rentalsRouter.delete("/rentals/:id", removeRental)
rentalsRouter.patch("/rentals/:id/return", updateRental)

export default rentalsRouter;