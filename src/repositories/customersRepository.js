import connection from "../db.js";

export async function list (filter, queryArgs){
    const { rows: customers } = await connection.query(`
        SELECT  customers.*,
                COUNT (rentals."customerId") AS "rentalsCount"
          FROM  customers
     LEFT JOIN  rentals
            ON  customers.id = rentals."customerId"
      ${filter}
      GROUP BY  customers.id
    `, queryArgs);

    if (!customers.length) return null;

    return customers;
}

export async function find(column, value){
    const { rows: [customer]} = await connection.query(`
        SELECT  * 
          FROM  customers 
         WHERE  ${column} = $1
    `,[value]);

    if (!customer) return null;

    return customer;
}

export async function insert({name, phone, cpf, birthday}){
    const result = await connection.query(`
        INSERT INTO  customers ( name, phone, cpf, birthday )
             VALUES  ( $1, $2, $3, $4 )
    `,[name, phone, cpf, birthday]);

    if (!result.rowCount) return false;

    return true;
}

export async function update({name, phone, cpf, birthday, id}){
    const result = await connection.query(`
        UPDATE  customers
           SET  name = $1, 
                phone = $2,
                cpf = $3,
                birthday = $4
         WHERE  id = $5
    `, [ name, phone, cpf, birthday, id ]);

    if (!result.rowCount) return false;

    return true;
}