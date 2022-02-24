import Router from "express"
import { allCategories, newCategorie } from "../controllers/categoriesController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import categoriesSchema from "../schemas/categoriesSchema.js";

const categoriesRouer = Router();

categoriesRouer.get("/categories", allCategories)
categoriesRouer.post("/categories", validateSchemaMiddleware , newCategorie)

export default categoriesRouer;