import {find, findInboundLinks, findOutboundLinks, parse} from "../src/graph";

describe('Make sure the graph logic works', () => {
    const graph = parse(
        __dirname + '/../inputs/example/input.json'
    );

    it('finds an entity', () => {
        const entity = find(graph, 5);

        expect(entity).toStrictEqual({
            'entity_id': 5,
            'name': 'EntityB'
        });
    });

    it('does not find an entity', () => {
        const entity = 1;

        expect(() => find(graph, entity))
            .toThrowError(`The entity ${entity} does not exist.`);
    });

    it('finds inbound links', () => {
        const entity = find(graph, 5);
        const links = findInboundLinks(graph, entity);

        expect(links).toStrictEqual([{
            'from': 3,
            'to': 5
        }]);
    });

    it('finds outbound links', () => {
        const entity = find(graph, 5);
        const links = findOutboundLinks(graph, entity);

        expect(links).toStrictEqual([{
            'from': 5,
            'to': 7
        }]);
    });
});
