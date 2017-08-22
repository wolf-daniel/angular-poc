import {combineReducers} from '@ngrx/store';

import {incidentListReducer} from './incident-list.reducer';

const reducers = {
  incidentList: incidentListReducer
};

export function AppReducer() {
  return combineReducers(reducers);
}
