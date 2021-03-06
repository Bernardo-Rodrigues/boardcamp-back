import connection from "../db.js";

export async function list (where, filter, queryArgs){
    const { rows: games } = await connection.query(`
        SELECT  games.*, 
                categories.name AS "categoryName",
                COUNT(rentals."gameId") AS "rentalsCount"
          FROM  games
          JOIN  categories
            ON  "categoryId" = categories.id
     LEFT JOIN  rentals
            ON  games.id = rentals."gameId"
      ${where}
      GROUP BY  games.id, categories.name
     ${filter}
    `, queryArgs);

    if (!games.length) return null;

    return games;
}

export async function find(column, value){
    const { rows: [game]} = await connection.query(`
        SELECT  * 
          FROM  games 
         WHERE  ${column} = $1
    `,[value]);

    if (!game) return null;

    return game;
}

export async function insert({name, image, stockTotal, categoryId, pricePerDay}){
    const result = await connection.query(`
        INSERT INTO  games ( name, image, "stockTotal", "categoryId", "pricePerDay" )
             VALUES  ( $1, $2, $3, $4, $5 )
    `,[name, image, stockTotal, categoryId, pricePerDay]);

    if (!result.rowCount) return false;

    return true;
}