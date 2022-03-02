import * as rentalsRepository from '../repositories/rentalsRepository.js';
import organizeRentalsObject from '../utils/organizeRentalsObject.js';
import NoContent from '../err/NoContentError.js';

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