import { Router } from "express";
import { allGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/games", allGames)

export default gamesRouter;