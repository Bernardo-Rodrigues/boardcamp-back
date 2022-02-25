import connection from "../db.js";

export default async function allCustomers ( req, res ){
    const { cpf } = req.query

    try {
        if(cpf){
            const { rows: arrayCustomers } = await connection.query(`
                SELECT  *
                  FROM  customers
                 WHERE  customers.cpf 
                  LIKE  $1
            `, [ `${cpf}%` ])
    
            return res.send(arrayCustomers)
        }

        const { rows: arrayCustomers } = await connection.query(`
            SELECT  *
              FROM  customers
        `)
        
        res.send(arrayCustomers)
    } catch (error) {
        res.status(500).send(error.message)
    }
}