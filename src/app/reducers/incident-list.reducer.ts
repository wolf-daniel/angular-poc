import * as IncidentsActions from '../actions/incidents.actions';
import * as SnoozeActions from '../actions/snooze.actions';
import {IncidentListInitialState, IncidentListState} from '../states/incidents.state';

export function incidentListReducer(state: IncidentListState = IncidentListInitialState, action: IncidentsActions.All|SnoozeActions.All) {
  switch (action.type) {
    case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
      return {
        incidents: action.incidents
      };
    case SnoozeActions.SNOOZE_REQUEST:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'snoozed';
          }
          return incident;
        })
      };
    case SnoozeActions.UNSNOOZE_REQUEST:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'active';
          }
          return incident;
        })
      };
    default:
      return state;
  }
}
