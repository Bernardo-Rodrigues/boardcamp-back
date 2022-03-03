import * as gamesRepository from '../repositories/gamesRepository.js';
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import NoContent from '../err/NoContentError.js';
import Conflict from '../err/ConflictError.js';
import BadRequest from "../err/BadRequestError.js"
import paginationFilter from '../utils/paginationFilter.js';

export async function list({name, offset, limit}){
    const partialFilter = ""
    const partialQueryArgs = []
    const partialArgs = 1

    if (name) {
        const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)
        
        partialFilter += ` WHERE games.name LIKE $${args}`
        partialQueryArgs.push(`${capitalizeName}%`)
        partialArgs++
    }

    const [filter, queryArgs] = paginationFilter(partialFilter, partialQueryArgs, partialArgs, offset, limit)
    
    const games = await gamesRepository.list(filter, queryArgs);
    if (!games || !games?.length) throw new NoContent();

    return games;
}
  
export async function insert(gameInfo){
    const { name, categoryId } = gameInfo

    const gameAlreadyExists = await gamesRepository.find("name", name);
    if (gameAlreadyExists) throw new Conflict('A jogo já existe');

    const categoryExists = await categoriesRepository.find("id", categoryId)
    if (!categoryExists) throw new BadRequest('A categoria não existe');

    const result = await gamesRepository.insert(gameInfo);
    if (!result) throw new Error();

    return true;
}