import { Router } from "express";
import { findCustomer, insertCustomer, listCustomers, updateCostumer } from "../controllers/customersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const customersRouter = Router()

customersRouter.get("/customers", listCustomers)
customersRouter.get("/customers/:id", findCustomer)
customersRouter.post("/customers", validateSchemaMiddleware, insertCustomer)
customersRouter.put("/customers/:id", validateSchemaMiddleware, updateCostumer)

export default customersRouter;