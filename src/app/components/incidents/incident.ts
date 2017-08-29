export interface Incident {
  id: string;
  folderId: string;
  status: string;
  sourceSystem: string;
  entities: Entity[];
}

export interface Entity {
  id: string;
  host: string;
  check: string;
}
