import {Action} from '@ngrx/store';
import {Incident} from '../incidents/incident';

export const GET_INCIDENT_LIST_REQUEST = 'GET_INCIDENT_LIST_REQUEST';
export const GET_INCIDENT_LIST_SUCCESS = 'GET_INCIDENT_LIST_SUCCESS';
export const SELECT_INCIDENT = 'SELECT_INCIDENT';
export const DESELECT_INCIDENT = 'DESELECT_INCIDENT';

export class GetIncidentListAction implements Action {
  readonly type = GET_INCIDENT_LIST_REQUEST;
  constructor(public incidents?: Incident[]) {}
}

export class GetIncidentListSuccessAction implements Action {
  readonly type = GET_INCIDENT_LIST_SUCCESS;
  constructor(public incidents?: Incident[]) {}
}

export class SelectIncidentAction implements Action {
  readonly type = SELECT_INCIDENT;
  constructor(public incidentId: string) {}
}

export class DeselectIncidentAction implements Action {
  readonly type = DESELECT_INCIDENT;
  constructor(public incidentId: string) {}
}

export type All =
  GetIncidentListAction |
  GetIncidentListSuccessAction |
  SelectIncidentAction |
  DeselectIncidentAction;
