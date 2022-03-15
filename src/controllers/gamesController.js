import * as gamesService from "../services/gamesService.js"
import { NoContent, BadRequest, Conflict } from "../err/index.js";

export async function listGames ( req, res ) {
    const filters = req.query

    try {
        const games = await gamesService.list(filters)
    
        res.send(games)
    } catch (error) {
        if (error instanceof NoContent) return res.status(error.status).send([]);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}

export async function insertGame ( req, res ) {
    const gameInfo = req.body
    
    try {
        await gamesService.insert(gameInfo)

        res.sendStatus(201)
    } catch (error) {
        if (error instanceof Conflict || error instanceof BadRequest) return res.status(error.status).send(error.message);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}