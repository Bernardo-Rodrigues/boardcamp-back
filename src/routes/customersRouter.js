import { Router } from "express";
import { allCustomers, customer } from "../controllers/customersController.js";

const customersRouter = Router()

customersRouter.get("/customers", allCustomers)
customersRouter.get("/customers/:id", customer)

export default customersRouter;