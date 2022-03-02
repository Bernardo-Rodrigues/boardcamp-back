import connection from "../db.js";
import organizeRentalsObject from "../utils/organizeRentalsObject.js";

export async function allRentals ( req, res ){
    const { customerId, gameId } = req.query

    const filter = (customerId && gameId) 
    ?   `WHERE r."customerId" = ${parseInt(customerId)} AND r."gameId" = ${parseInt(gameId)}` :   customerId 
    ?   `WHERE r."customerId" = ${parseInt(customerId)}` :   gameId 
    ?   `WHERE r."gameId" = ${parseInt(gameId)}` :   ""

    try {
        let { rows: arrayRentals } = await connection.query(`
            SELECT  r.*,
                    cu.id AS "customerId",
                    cu.name AS "customerName",
                    g.id AS "gameId",
                    g.name AS "gameName",
                    g."categoryId",
                    ca.name AS "categoryName"
              FROM  rentals r
              JOIN  customers cu
                ON  r."customerId" = cu.id
              JOIN  games g
                ON  r."gameId" = g.id
              JOIN  categories ca
                ON  g."categoryId" = ca.id
         ${filter} 
        `)

        arrayRentals = organizeRentalsObject(arrayRentals)

        res.send(arrayRentals)
    } catch (error) {
        res.status(500).send(error.message)
    }
}