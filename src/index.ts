import yargs from 'yargs';
import validation from './cli/validation';
import {copy} from './graph';

yargs
    .usage('Usage: <inputfile> <entityid>')
    .demandCommand(2);

const file = yargs.argv._[0];
const entityId = parseInt(yargs.argv._[1]);

const graph = copy(
    validation(file, entityId), entityId
);

console.log(JSON.stringify(graph));
