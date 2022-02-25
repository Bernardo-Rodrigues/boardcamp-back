import connection from "../db.js";

export async function allGames ( req, res ) {
    const { name } = req.query

    try {
        if(name){
            const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)
            const { rows: arrayGames } = await connection.query(`
                SELECT  games.*, 
                        categories.name AS "categoryName"
                  FROM  games
                  JOIN  categories 
                    ON  games."categoryId" = categories.id
                 WHERE  games.name 
                  LIKE  $1
            `, [ `${capitalizeName}%` ])
    
            return res.send(arrayGames)
        }
    
        const { rows: arrayGames } = await connection.query(`
            SELECT  games.*, 
                    categories.name AS "categoryName"
              FROM  games
              JOIN  categories
                ON  games."categoryId" = categories.id
        `)
    
        res.send(arrayGames)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function newGame ( req, res ) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body
    
    try {
        const haveGame = await connection.query(`
            SELECT  *
              FROM  games
             WHERE  name = $1
        `, [ name ]);
        
        if(haveGame.rows.length) return res.sendStatus(409)

        const haveCategorie = await connection.query(`
            SELECT  *
              FROM  categories
             WHERE  id = $1
        `, [ parseInt(categoryId) ]);

        if(!haveCategorie.rows.length) return res.sendStatus(400)
    
        await connection.query(`
            INSERT INTO  games ( name, image, "stockTotal", "categoryId", "pricePerDay" )
                 VALUES  ( $1, $2, $3, $4, $5 )
        `, [ name, image, parseInt(stockTotal), parseInt(categoryId), pricePerDay ]);

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}