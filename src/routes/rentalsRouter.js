import { Router } from "express";
import { listRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals)

export default rentalsRouter;