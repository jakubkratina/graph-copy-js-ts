import validation from '../src/cli/validation';

describe('CLI validation tests', () => {
    it('does not find a file', () => {
        expect(() => validation(__dirname + '/foo.json', 2))
            .toThrowError(`The input file ${__dirname + '/foo.json'} does not exist.`);
    });

    it('does not find an entity', () => {
        const entity = 1;

        expect(() => validation(__dirname + '/fixtures/input.json', entity))
            .toThrowError(`The entity ${entity} does not exist.`);
    });
});
