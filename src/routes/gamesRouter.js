import { Router } from "express";
import { insertGame, listGames } from "../controllers/gamesController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", listGames)
gamesRouter.post("/games", validateSchemaMiddleware, insertGame)

export default gamesRouter;