import * as gamesRepository from '../repositories/gamesRepository.js';
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import NoContent from '../err/NoContentError.js';
import Conflict from '../err/ConflictError.js';
import BadRequest from "../err/BadRequestError.js"

export async function list(name){
    let filter = ""
    let queryArgs = []

    if (name) {
        const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)
        
        filter = "WHERE games.name LIKE $1"
        queryArgs = [`${capitalizeName}%`]
    }
    
    const games = await gamesRepository.list(filter, queryArgs);

    if (!games || !games?.length) throw new NoContent();

    return games;
}
  
export async function insert(gameInfo){
    const { name, categoryId } = gameInfo

    const gameAlreadyExists = await gamesRepository.find(name);

    if (gameAlreadyExists) throw new Conflict('A jogo já existe');

    const categoryExists = await categoriesRepository.find("id", categoryId)

    if (!categoryExists) throw new BadRequest('A categoria não existe');

    const result = await gamesRepository.insert(gameInfo);

    if (!result) throw new Error();

    return true;
}