import * as categoriesReposity from '../repositories/categoriesRepository.js';
import NoContent from '../err/NoContentError.js';
import Conflict from '../err/ConflictError.js';
import paginationFilter from '../utils/paginationFilter.js';

export async function list({offset, limit}){
    const partialFilter = ""
    const partialQueryArgs = []
    const partialArgs = 1

    const [filter, queryArgs] = paginationFilter(partialFilter, partialQueryArgs, partialArgs, offset, limit)

    const categories = await categoriesReposity.list(filter, queryArgs);
    if (!categories || !categories?.length) throw new NoContent();

    return categories;
}
  
export async function insert(name){
    const categoryAlreadyExists = await categoriesReposity.find("name", name);
    if (categoryAlreadyExists) throw new Conflict('A categoria já existe');

    const result = await categoriesReposity.insert(name);
    if (!result) throw new Error();

    return true;
}