import {copy, parse} from "../src/graph";

describe('Graph copies', () => {
    it('make a successful example copy', () => {
        const response = copy(
            parse(__dirname + '/../inputs/example/input.json'), 5
        );

        expect(response).toStrictEqual(
            parse(__dirname + '/../inputs/example/output.json')
        );
    });

    it('it copies a graph with two initial inbounds', () => {
        const response = copy(
            parse(__dirname + '/../inputs/two-inbound-links/input.json'), 7
        );

        expect(response).toStrictEqual(
            parse(__dirname + '/../inputs/two-inbound-links/output.json')
        );
    });
});
