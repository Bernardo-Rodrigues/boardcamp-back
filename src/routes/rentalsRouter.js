import { Router } from "express";
import { getMetrics, insertRental, listRentals, removeRental, updateRental } from "../controllers/rentalsController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js"
const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals)
rentalsRouter.post("/rentals", validateSchemaMiddleware, insertRental)
rentalsRouter.delete("/rentals/:id", removeRental)
rentalsRouter.post("/rentals/:id/return", updateRental)
rentalsRouter.get("/rentals/metrics", getMetrics)

export default rentalsRouter;