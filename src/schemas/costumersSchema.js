import joi from "joi"

const cpfRegex = /^[0-9]{11}$/
const phoneRegex = /^[0-9]{10,11}$/
const birthdayRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(phoneRegex).required(),
    cpf: joi.string().pattern(cpfRegex).required(),
    birthday: joi.string().pattern(birthdayRegex).required()
});

export default customersSchema;