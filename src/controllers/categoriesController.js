import * as categoriesService from "../services/categoriesService.js"
import { NoContent, Conflict } from "../err/index.js"

export async function listCategories ( req, res ) {
    try {
        const categories = await categoriesService.list();

        res.send(categories)
    } catch (error) {
        if (error instanceof NoContent) return res.status(error.status).send([]);

        res.status(500).send(error.message)
    }
}

export async function insertCategorie ( req, res ) {
    const { name } = req.body
    
    try {
        await categoriesService.insert(name)

        res.sendStatus(201)
    } catch (error) {
        if (error instanceof Conflict) return res.status(error.status).send(error.message);

        res.status(500).send(error.message)
    }
}