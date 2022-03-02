import Router from "express"
import { insertCategorie, listCategories } from "../controllers/categoriesController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const categoriesRouer = Router();

categoriesRouer.get("/categories", listCategories)
categoriesRouer.post("/categories", validateSchemaMiddleware , insertCategorie)

export default categoriesRouer;