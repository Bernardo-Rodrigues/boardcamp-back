import connection from "../db.js";

export async function list (filter, queryArgs){
    const { rows: rentals } = await connection.query(`
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
    `, queryArgs);

    if (!rentals.length) return null;

    return rentals;
}
