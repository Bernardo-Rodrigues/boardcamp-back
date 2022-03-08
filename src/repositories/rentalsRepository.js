import dayjs from "dayjs";
import connection from "../db.js";

export async function list (where, filter, queryArgs){
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
      ${where}
     ${filter}
    `, queryArgs);

    if (!rentals.length) return null;

    return rentals;
}

export async function find(column, value){
  const { rows: [rental]} = await connection.query(`
      SELECT  * 
        FROM  rentals 
       WHERE  ${column} = $1
  `,[value]);

  if (!rental) return null;

  return rental;
}


export async function insert ({customerId, gameId, daysRented, gamePrice}){
  const result = await connection.query(`
      INSERT INTO  rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
           VALUES  ($1, $2, $3, $4, $5, $6, $7)
      `, [ customerId, gameId, dayjs(), daysRented, null, (daysRented * gamePrice) , null]);

  if (!result.rowCount) return false;

  return true;
}

export async function remove (id){
  const result = await connection.query(`
      DELETE
        FROM  rentals
       WHERE  id = $1
      `, [ id ]);

  if (!result.rowCount) return false;

  return true;
}

export async function update (id, delayFee){
  const result = await connection.query(`
      UPDATE  rentals
         SET  "returnDate" = $1,
              "delayFee" = $2
       WHERE  id = $3
      `, [ dayjs(), delayFee , id ]);

  if (!result.rowCount) return false;

  return true;
}

export async function getMetrics (filter, queryArgs){
  const { rows: [metrics] } = await connection.query(`
      SELECT  SUM ("originalPrice") + SUM("delayFee") AS revenue,
              COUNT (id) as rentals,
              ROUND (
                  (SUM ("originalPrice") + SUM("delayFee")) / COUNT (id)
                  ::DECIMAL,2
              ) AS average
        FROM  rentals r
   ${filter}
  `, queryArgs);

  if (!metrics) return null;

  return metrics;
}