import tableColumnNumber from "./tableColumnNumber.js"

export default function createFilter(table, {cpf, name, customerId, gameId, order, desc, offset, limit}){
    let filter = ""
    let queryArgs = []
    let args = 1
    
    if(table === "customers"){
        if(cpf){
            filter += ` WHERE  cpf LIKE  $${args}`
            queryArgs.push(`${cpf}%`)
            args++
        }
    }else if(table === "games"){
        if (name) {
            const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)
            
            filter += ` WHERE games.name LIKE $${args}`
            queryArgs.push(`${capitalizeName}%`)
            args++
        }
    }else if(table === "rentals"){
        if (customerId) {
            filter += ` WHERE r."customerId" = $${args}`
            queryArgs.push(customerId)
            args++
        }
        if (gameId) {
            if(args === 1) filter = ` WHERE r."gameId" = $${args}`
            else filter += ` AND r."gameId" = $${args}`
            queryArgs.push(gameId)
            args++
        }
    }
    
    if (order) {
        const orderBy = tableColumnNumber[table][order]

        filter += ` ORDER BY ${orderBy}`
        if(desc) filter += ` DESC`
    }
    if (limit) {
        filter += ` LIMIT $${args}`
        queryArgs.push(limit)
        args++
    }
    if (offset) {
        filter += ` OFFSET $${args}`
        queryArgs.push(offset)
    }
    
    return [filter, queryArgs]
}