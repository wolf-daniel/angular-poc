import {Action} from '@ngrx/store';
import {Incident} from '../incidents/incident';

export const INCIDENT_LIST_GET = 'INCIDENT_LIST_GET';

export class GetIncidentList implements Action {
  readonly type = INCIDENT_LIST_GET;

  constructor(public incidents: Incident[]) {}
}

export type All = GetIncidentList;
