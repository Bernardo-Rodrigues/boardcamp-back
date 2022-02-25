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
        `, [ id ])
    
        if(!customer) return res.sendStatus(404)

        res.send(customer)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function newCustomer ( req, res ){
    const { name, phone, cpf, birthday } = req.body

    try {
        const haveCustomer = await connection.query(`
            SELECT  *
              FROM  customers
             WHERE  cpf = $1
        `, [ cpf ]);
        
        if(haveCustomer.rows.length) return res.sendStatus(409)
        
        await connection.query(`
            INSERT INTO  customers ( name, phone, cpf, birthday )
                 VALUES  ( $1, $2, $3, $4 )
        `, [ name, phone, cpf, birthday]);

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function updateCostumer ( req, res ){
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {
        const haveCustomer = await connection.query(`
            SELECT  *
              FROM  customers
             WHERE  cpf = $1
        `, [ cpf ]);
        
        if(haveCustomer.rows.length) return res.sendStatus(409)

        const { rowCount: update} = await connection.query(`
            UPDATE  customers
               SET  name = $1, 
                    phone = $2,
                    cpf = $3,
                    birthday = $4
             WHERE  id = $5
        `, [ name, phone, cpf, birthday, id ]);

        if(!update) return res.sendStatus(404)

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}