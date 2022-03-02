import * as rentalsService from "../services/rentalsService.js"
import { NoContent } from "../err/index.js";

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