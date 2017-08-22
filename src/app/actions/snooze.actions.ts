import {Action} from '@ngrx/store';

export const GET_SNOOZE_REQUEST = 'GET_SNOOZE_REQUEST';
export const GET_SNOOZE_SUCCESS = 'GET_SNOOZE_SUCCESS';
export const SNOOZE_REQUEST = 'SNOOZE_REQUEST';
export const SNOOZE_SUCCESS = 'SNOOZE_SUCCESS';
export const UNSNOOZE_REQUEST = 'UNSNOOZE_REQUEST';
export const UNSNOOZE_SUCCESS = 'UNSNOOZE_SUCCESS';

export class GetSnoozeAction implements Action {
  readonly type = GET_SNOOZE_REQUEST;
  constructor(public snoozedIncidentIds?: string[]) {}
}

export class GetSnoozeSuccessAction implements Action {
  readonly type = GET_SNOOZE_SUCCESS;
  constructor(public snoozedIncidentIds?: string[]) {}
}

export class SnoozeAction implements Action {
  readonly type = SNOOZE_REQUEST;
  constructor(public incidentId: string) {}
}

export class SnoozeSuccessAction implements Action {
  readonly type = SNOOZE_SUCCESS;
  constructor(public incidentId: string) {}
}

export class UnsnoozeAction implements Action {
  readonly type = UNSNOOZE_REQUEST;
  constructor(public incidentId: string) {}
}

export class UnsnoozeSuccessAction implements Action {
  readonly type = UNSNOOZE_SUCCESS;
  constructor(public incidentId: string) {}
}

export type All =
  GetSnoozeAction |
  GetSnoozeSuccessAction |
  SnoozeAction |
  SnoozeSuccessAction |
  UnsnoozeAction |
  UnsnoozeSuccessAction;
