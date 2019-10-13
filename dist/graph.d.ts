import { Entity, Graph, Link } from "../interfaces";
export declare const find: (graph: Graph, entityId: number) => Entity;
export declare const findInboundLinks: (graph: Graph, entity: Entity) => Link[];
export declare const findOutboundLinks: (graph: Graph, entity: Entity) => Link[];
export declare const parse: (file: string) => Graph;
export declare const copy: (graph: Graph, entityId: number) => Graph;
