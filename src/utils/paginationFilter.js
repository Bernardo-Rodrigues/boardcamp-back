export default function pagination(filter, queryArgs, args, offset, limit){
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