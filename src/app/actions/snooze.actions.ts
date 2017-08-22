import {Action} from '@ngrx/store';
import {Incident} from '../incidents/incident';

export const GET_SNOOZE_REQUEST = 'GET_SNOOZE_REQUEST';
export const GET_SNOOZE_SUCCESS = 'GET_SNOOZE_SUCCESS';

export class GetSnoozeAction implements Action {
  readonly type = GET_SNOOZE_REQUEST;
  constructor(public snoozedIncidentIds?: string[]) {}
}

export class GetSnoozeSuccessAction implements Action {
  readonly type = GET_SNOOZE_SUCCESS;
  constructor(public snoozedIncidentIds?: string[]) {}
}

export type All =
  GetSnoozeAction |
  GetSnoozeSuccessAction;
