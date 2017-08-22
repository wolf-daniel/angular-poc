export interface Incident {
  id: string;
  status: string;
  sourceSystem: string;
  entities: Entity[];
}

export interface Entity {
  id: string;
  host: string;
  check: string;
}
