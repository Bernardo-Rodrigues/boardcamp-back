import dayjs from "dayjs"
import tableColumnNumber from "./tableColumnNumber.js"

export default function createFilter(table, {cpf, name, customerId, gameId, status, startDate, endDate, order, desc, offset, limit}){
    let where = ""
    let filter = ""
    let queryArgs = []

    if(table === "customers"){
        if(cpf){
            queryArgs.push(`${cpf}%`)
            where += ` WHERE  cpf LIKE  $${queryArgs.length}`
        }
    }else if(table === "games"){
        if (name) {
            queryArgs.push(`${name}%`)
            where += ` WHERE games.name ILIKE $${queryArgs.length}`
        }
    }else if(table === "rentals"){
        if (customerId) {
            queryArgs.push(customerId)
            where += ` WHERE r."customerId" = $${queryArgs.length}`
        }
        if (gameId) {
            queryArgs.push(gameId)
            if(queryArgs.length === 1) where += ` WHERE r."gameId" = $${queryArgs.length}`
            else where += ` AND r."gameId" = $${queryArgs.length}`
        }
        if (status === "open") {
            if(queryArgs.length === 0) where += ` WHERE r."returnDate" IS NULL`
            else where += ` AND r."returnDate" IS NULL`
        } else if (status === "closed") {
            if(queryArgs.length === 0) where += ` WHERE r."returnDate" IS NOT NULL`
            else where += ` AND r."returnDate" IS NOT NULL`
        }
        if (startDate) {
            queryArgs.push(dayjs(startDate).format("YYYY-MM-DD"))
            if(queryArgs.length === 1) where += ` WHERE r."rentDate" >= $${queryArgs.length}`
            else where += ` AND r."rentDate" >= $${queryArgs.length}`
        } 
        if (endDate) {
            queryArgs.push(dayjs(endDate).format("YYYY-MM-DD"))
            if(queryArgs.length === 1) where += ` WHERE r."rentDate" <= $${queryArgs.length}`
            else where += ` AND r."rentDate" <= $${queryArgs.length}`
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
    
    return [where, filter, queryArgs]
}