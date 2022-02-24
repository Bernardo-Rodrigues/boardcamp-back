
 
import categoriesSchema from "../schemas/categoriesSchema.js"
import trim from "trim"
import { stripHtml } from "string-strip-html"

function sanitizeString(string){
    return trim(stripHtml(string).result)
}

const schemas = {
    "/categories": categoriesSchema
}

export default async function validateSchemaMiddleware(req, res, next){
    const { body } = req
    const schema = schemas["/"+req.path.split("/")[1]]
    
    Object.keys(body).forEach( key => {
        if(typeof(body[key]) === "string") body[key] = sanitizeString(body[key])
    })

    const validation = schema.validate(body, { abortEarly: false })
    if(validation.error) return res.status(400).send(validation.error.message)

    next()
}