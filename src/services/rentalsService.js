import * as rentalsRepository from '../repositories/rentalsRepository.js';
import * as customerRepository from "../repositories/customersRepository.js"
import * as gamesRepository from "../repositories/gamesRepository.js"
import organizeRentalsObject from '../utils/organizeRentalsObject.js';
import { NoContent, NotFound, BadRequest} from "../err/index.js"

export async function list({customerId, gameId}){
    let filter = ""
    let queryArgs = []

    if (customerId && gameId) {
        filter = `WHERE r."customerId" = $1 AND r."gameId" = $2`
        queryArgs = [customerId, gameId]
    }
    else if (customerId){
        filter = `WHERE r."customerId" = $1 `
        queryArgs = [customerId]
    }
    else if (gameId) {
        filter = `WHERE r."gameId" = $1`
        queryArgs = [gameId]
    }
    
    let rentals =  await rentalsRepository.list(filter, queryArgs)
    if (!rentals || !rentals?.length) throw new NoContent();
    
    rentals = organizeRentalsObject(rentals)
    
    return rentals;
}

export async function insert(rentalInfo){
    const { customerId, gameId, daysRented } = rentalInfo

    const customerExists = await customerRepository.find("id", customerId);
    if (!customerExists) throw new BadRequest('O cliente não existe');

    const gameExists = await gamesRepository.find("id", gameId)
    if (!gameExists) throw new BadRequest('O jogo não existe');

    if(daysRented <= 0) throw new BadRequest('Valor da quantidade de dias do aluguel inválido');

    let gameRentals =  await rentalsRepository.list(`WHERE r."gameId" = $1`, [gameId])
    if(gameRentals?.length === gameExists.stockTotal) throw new BadRequest('Não existem mais jogos disponíveis');

    const result = await rentalsRepository.insert({...rentalInfo, gamePrice:gameExists.pricePerDay});

    if (!result) throw new Error();

    return true;
}

export async function remove(rentalId){
    const rentalExists = await rentalsRepository.find("id", rentalId);
    if (!rentalExists) throw new NotFound('O aluguel não existe');

    const result = await rentalsRepository.remove(rentalId);

    if (!result) throw new Error();

    return true;
}