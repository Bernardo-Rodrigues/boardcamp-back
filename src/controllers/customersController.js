import * as customersService from "../services/customersService.js"
import { NoContent, NotFound, Conflict } from "../err/index.js";

export async function listCustomers ( req, res ){
    const filters = req.query

    try {
        const customers = await customersService.list(filters)
        
        res.send(customers)
    } catch (error) {
        if (error instanceof NoContent) return res.status(error.status).send([]);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}

export async function findCustomer ( req, res ){
    const { id } = req.params

    try {
        const customer = await customersService.find("id", id)

        res.send(customer)
    } catch (error) {
        if (error instanceof NotFound) return res.status(error.status).send(error.message);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}

export async function insertCustomer ( req, res ){
    const customerInfo = req.body

    try {
        await customersService.insert(customerInfo)

        res.sendStatus(201)
    } catch (error) {
        if (error instanceof Conflict) return res.status(error.status).send(error.message);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}

export async function updateCostumer ( req, res ){
    const customerInfo = req.body
    const { id } = req.params

    try {
        await customersService.update({...customerInfo, id})

        res.sendStatus(200)
    } catch (error) {
        if (error instanceof Conflict  || error instanceof NotFound) return res.status(error.status).send(error.message);

        console.log(error.message)
        res.status(500).send("Unexpected server error")
    }
}