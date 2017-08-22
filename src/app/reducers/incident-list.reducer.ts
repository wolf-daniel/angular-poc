import * as IncidentsActions from '../actions/incidents.actions';
import {IncidentListInitialState, IncidentListState} from '../states/incidents.state';

export function incidentListReducer(state: IncidentListState = IncidentListInitialState, action: IncidentsActions.All) {
  switch (action.type) {
    case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
      return {
        incidents: action.incidents
      };
    default:
      return state;
  }
}
