import dayjs from "dayjs"
import tableColumnNumber from "./tableColumnNumber.js"

export default function createFilter(table, {cpf, name, customerId, gameId, status, startDate, endDate, order, desc, offset, limit}){
    let filter = ""
    let queryArgs = []

    if(table === "customers"){
        if(cpf){
            queryArgs.push(`${cpf}%`)
            filter += ` WHERE  cpf LIKE  $${queryArgs.length}`
        }
    }else if(table === "games"){
        if (name) {
            queryArgs.push(`${name}%`)
            filter += ` WHERE games.name ILIKE $${queryArgs.length}`
        }
    }else if(table === "rentals"){
        if (customerId) {
            queryArgs.push(customerId)
            filter += ` WHERE r."customerId" = $${queryArgs.length}`
        }
        if (gameId) {
            queryArgs.push(gameId)
            if(queryArgs.length === 1) filter += ` WHERE r."gameId" = $${queryArgs.length}`
            else filter += ` AND r."gameId" = $${queryArgs.length}`
        }
        if (status === "open") {
            if(queryArgs.length === 0) filter += ` WHERE r."returnDate" IS NULL`
            else filter += ` AND r."returnDate" IS NULL`
        } else if (status === "closed") {
            if(queryArgs.length === 0) filter += ` WHERE r."returnDate" IS NOT NULL`
            else filter += ` AND r."returnDate" IS NOT NULL`
        }
        if (startDate) {
            queryArgs.push(dayjs(startDate).format("YYYY-MM-DD"))
            if(queryArgs.length === 1) filter += ` WHERE r."rentDate" >= $${queryArgs.length}`
            else filter += ` AND r."rentDate" >= $${queryArgs.length}`
        } 
        if (endDate) {
            queryArgs.push(dayjs(endDate).format("YYYY-MM-DD"))
            if(queryArgs.length === 1) filter += ` WHERE r."rentDate" <= $${queryArgs.length}`
            else filter += ` AND r."rentDate" <= $${queryArgs.length}`
        } 
    }
    
    if (order) {
        const orderBy = tableColumnNumber[table][order]

        filter += ` ORDER BY ${orderBy}`
        if(desc) filter += ` DESC`
    }
    if (limit) {
        queryArgs.push(limit)
        filter += ` LIMIT $${queryArgs.length}`
    }
    if (offset) {
        queryArgs.push(offset)
        filter += ` OFFSET $${queryArgs.length}`
    }
    
    return [filter, queryArgs]
}