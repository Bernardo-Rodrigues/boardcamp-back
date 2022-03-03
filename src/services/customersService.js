import * as customerRepository from '../repositories/customersRepository.js';
import NoContent from '../err/NoContentError.js';
import Conflict from '../err/ConflictError.js';
import NotFound from "../err/NotFoundError.js"

export async function list(cpf){
    let filter = ""
    let queryArgs = []

    if(cpf){
        filter = "WHERE  cpf LIKE  $1"
        queryArgs = [`${cpf}%`]
    }

    const customers = await customerRepository.list(filter,queryArgs);
    if (!customers || !customers?.length) throw new NoContent();

    return customers;
}

export async function find(column, value){
    const customer = await customerRepository.find(column, value);

    if (!customer) throw new NotFound('Esse cliente não existe');

    return customer;
}
  
export async function insert(customerInfo){
    const { cpf } = customerInfo

    const customerAlreadyExists = await customerRepository.find("cpf", cpf);
    if (customerAlreadyExists) throw new Conflict('O cliente já existe');

    const result = await customerRepository.insert(customerInfo);
    if (!result) throw new Error();

    return true;
}

export async function update(customerInfo){
    const { cpf, id } = customerInfo

    const customerExists = await customerRepository.find("id", id);
    if (!customerExists) throw new NotFound('Esse cliente não existe');
        
    const cpfAlreadyExists = await customerRepository.find("cpf", cpf);
    if (cpfAlreadyExists) throw new Conflict('Esse CPF já está registrado');

    const result = await customerRepository.update(customerInfo);
    if (!result) throw new Error();

    return true;
}