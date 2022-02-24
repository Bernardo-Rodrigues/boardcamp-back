import Router from "express"
import { allCategories } from "../controllers/categoriesController.js";

const categoriesRouer = Router();

categoriesRouer.get("/categories", allCategories)

export default categoriesRouer;