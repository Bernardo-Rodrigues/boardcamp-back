import { Router } from "express";
import allCustomers from "../controllers/customersController.js";

const customersRouter = Router()

customersRouter.get("/customers", allCustomers)

export default customersRouter;