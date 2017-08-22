import * as IncidentsActions from '../actions/incidents.actions';
import {IncidentListInitialState, IncidentListState} from '../states/incidents.state';

export type Action = IncidentsActions.All;

export function incidentListReducer(state: IncidentListState = IncidentListInitialState, action: Action) {
  console.log('state:', state, 'action:', action);
  switch (action.type) {
    case IncidentsActions.INCIDENT_LIST_GET:
      return {
        incidents: action.incidents
      };
    default:
      return state;
  }
}
