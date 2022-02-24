import connection from "../db.js";

export async function allGames ( req, res ) {
    const { name } = req.query

    try {
        if(name){
            const arrayGames = await connection.query(`
                SELECT *
                FROM games
                WHERE name
                LIKE $1
            `, [ `'${name}%'` ])
    
            return res.send(arrayGames.rows)
        }
    
        const arrayGames = await connection.query(`
            SELECT *
            FROM games
        `)
    
        res.send(arrayGames.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}