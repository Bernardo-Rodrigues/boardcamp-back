import connection from "../db.js";

export async function list (){
    const { rows: categories } = await connection.query(`
        SELECT  * 
          FROM  categories;
    `);

    if (!categories.length) return null;

    return categories;
}

export async function find(column, value){
    const { rows: [category]} = await connection.query(`
        SELECT  * 
          FROM  categories 
         WHERE  ${column} = $1
    `, [value]);

    if (!category) return null;

    return category;
}

export async function insert(name){
    const result = await connection.query(`
        INSERT INTO  categories (name) 
             VALUES  ($1)
    `,[name]);

    if (!result.rowCount) return false;

    return true;
}