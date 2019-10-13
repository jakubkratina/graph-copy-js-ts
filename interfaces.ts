export interface Entity {
    entity_id: number;
    name: string;
}

export interface Link {
    from: number;
    to: number;
}

export interface Graph {
    entities: Entity[];
    links: Link[];
}
