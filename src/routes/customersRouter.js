import { Router } from "express";
import { allCustomers, customer, newCustomer } from "../controllers/customersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const customersRouter = Router()

customersRouter.get("/customers", allCustomers)
customersRouter.get("/customers/:id", customer)
customersRouter.post("/customers", validateSchemaMiddleware, newCustomer)

export default customersRouter;