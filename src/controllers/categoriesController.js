import * as categoriesService from "../services/categoriesService.js"
import { NoContent, Conflict } from "../err/index.js"

export async function listCategories ( req, res ) {
    const filters = req.query

    try {
        const categories = await categoriesService.list(filters);

        res.send(categories)
    } catch (error) {
        if (error instanceof NoContent) return res.status(error.status).send([]);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}

export async function insertCategorie ( req, res ) {
    const { name } = req.body
    
    try {
        await categoriesService.insert(name)

        res.sendStatus(201)
    } catch (error) {
        if (error instanceof Conflict) return res.status(error.status).send(error.message);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}