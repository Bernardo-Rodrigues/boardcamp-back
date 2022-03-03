import * as rentalsService from "../services/rentalsService.js"
import { NoContent, BadRequest } from "../err/index.js";

export async function listRentals ( req, res ){
    const filters = req.query

    try {
        const rentals = await rentalsService.list(filters)

        res.send(rentals)
    } catch (error) {
      if (error instanceof NoContent) return res.status(error.status).send([]);

      res.status(500).send(error.message)
    }
}

export async function insertRental ( req, res ){
    const rentalInfo = req.body
    
    try {
        await rentalsService.insert(rentalInfo)

        res.sendStatus(201)
    } catch (error) {
        if (error instanceof BadRequest) return res.status(error.status).send(error.message);

        res.status(500).send(error.message)
    }
}