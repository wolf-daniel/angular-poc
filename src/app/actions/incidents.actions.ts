import {Action} from '@ngrx/store';
import {Incident} from '../incidents/incident';

export const GET_INCIDENT_LIST_REQUEST = 'GET_INCIDENT_LIST_REQUEST';
export const GET_INCIDENT_LIST_SUCCESS = 'GET_INCIDENT_LIST_SUCCESS';

export class GetIncidentListAction implements Action {
  readonly type = GET_INCIDENT_LIST_REQUEST;
  constructor(public incidents?: Incident[]) {}
}

export class GetIncidentListSuccessAction implements Action {
  readonly type = GET_INCIDENT_LIST_SUCCESS;
  constructor(public incidents?: Incident[]) {}
}

export type All =
  GetIncidentListAction |
  GetIncidentListSuccessAction;
