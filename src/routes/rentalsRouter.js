import { Router } from "express";
import { allRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", allRentals)

export default rentalsRouter;