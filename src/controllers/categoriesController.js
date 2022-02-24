import connection from "../db.js";

export async function allCategories ( req, res ) {
    const arrayCategories = await connection.query(`
        SELECT *
        FROM categories
    `)
    res.send(arrayCategories.rows)
}