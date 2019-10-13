import {Entity, Graph, Link} from "../interfaces";
import fs from 'fs';

export const copy = (graph: &Graph, entityId: number): Graph => {
    const initial = find(graph, entityId);
    const initialClone = clone(graph, initial);

    copyInboundLinks(graph, initialClone, initial);

    copyDescendants(graph, initial, initialClone);

    return graph;
};

const copyDescendants = (graph: &Graph, entity: Entity, entityClone: Entity): void => {
    const links = findOutboundLinks(graph, entity);

    if (links.length) {
        links.forEach(link => {
            const descendant = find(graph, link.to);
            const descendantClone = clone(graph, descendant);

            graph.links.push({
                from: entityClone.entity_id,
                to: descendantClone.entity_id
            });

            copyDescendants(graph, descendant, descendantClone);
        })
    }
};

export const find = (graph: Graph, entityId: number): Entity => {
    const entity = graph.entities.find(entity => entity.entity_id === entityId);

    if (entity === undefined) {
        throw new Error(`The entity ${entityId} does not exist.`);
    }

    return entity;
};

export const findInboundLinks = (graph: Graph, entity: Entity): Link[] => {
    return graph.links.filter(link => link.to === entity.entity_id);
};

export const findOutboundLinks = (graph: Graph, entity: Entity): Link[] => {
    return graph.links.filter(link => link.from === entity.entity_id);
};

export const parse = (file: string): Graph => {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

const copyInboundLinks = (graph: &Graph, entity: Entity, ancestor: Entity) => {
    findInboundLinks(graph, ancestor).forEach(link => {
        graph.links.push({
            from: link.from,
            to: entity.entity_id
        });
    });
};

// Note: in the production, I'd expect a store/DB call instead of getting the last element from the graph array
const generateId = (graph: Graph) => graph.entities[graph.entities.length - 1].entity_id + 1;

const clone = (graph: &Graph, entity: Entity): Entity => {
    const clone = {
        ...entity, ...{
            entity_id: generateId(graph)
        }
    };

    graph.entities.push(clone);

    return clone;
};
