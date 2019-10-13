import { Graph } from "../interfaces";
export declare const find: (graph: Graph, entityId: number) => import("../interfaces").Entity | undefined;
export declare const parse: (file: string) => Graph;
declare const copy: (entity: number) => number;
export default copy;
