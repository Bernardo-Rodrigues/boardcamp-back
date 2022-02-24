import { Router } from "express";
import { allGames, newGame } from "../controllers/gamesController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", allGames)
gamesRouter.post("/games", validateSchemaMiddleware, newGame)

export default gamesRouter;