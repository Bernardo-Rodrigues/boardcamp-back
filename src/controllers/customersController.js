import connection from "../db.js";

export async function allCustomers ( req, res ){
    const { cpf } = req.query

    try {
        if(cpf){
            const { rows: arrayCustomers } = await connection.query(`
                SELECT  *
                  FROM  customers
                 WHERE  cpf 
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

export async function customer ( req, res ){
    const { id } = req.params

    try {
        const { rows: [customer] } = await connection.query(`
                SELECT  *
                  FROM  customers
                 WHERE  id = $1
        `, [ id.slice(1) ])
    
        if(!customer) return res.sendStatus(404)

        res.send(customer)
    } catch (error) {
        res.status(500).send(error.message)
    }
}