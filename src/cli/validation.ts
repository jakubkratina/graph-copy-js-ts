import fs from 'fs';
import {find, parse} from '../graph';

const input = (file: string, entity: number) => {
    if (!fs.existsSync(file)) {
        throw new Error(`The input file ${file} does not exist.`);
    }

    let graph = parse(file);

    if (!find(graph, entity)) {
        throw new Error(`The entity ${entity} does not exist.`);
    }

    return graph;
};

export default input;
