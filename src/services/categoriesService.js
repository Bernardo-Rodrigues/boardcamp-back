import * as categoriesReposity from '../repositories/categoriesRepository.js';
import { NoContent, Conflict} from "../err/index.js"
import createFilter from '../utils/createFilter.js';

export async function list(filters){
    const [where, filter, queryArgs] = createFilter("category", filters)

    const categories = await categoriesReposity.list(where, filter, queryArgs);
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