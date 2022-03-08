import * as gamesRepository from '../repositories/gamesRepository.js';
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import { NoContent, BadRequest, Conflict} from "../err/index.js"
import createFilter from '../utils/createFilter.js';

export async function list(filters){
    const [where, filter, queryArgs] = createFilter("games", filters)
    
    const games = await gamesRepository.list(where, filter, queryArgs);
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