import * as IncidentsActions from '../actions/incidents.actions';
import * as SnoozeActions from '../actions/snooze.actions';
import {IncidentListInitialState, IncidentListState} from '../states/incidents.state';

export function incidentListReducer(state: IncidentListState = IncidentListInitialState, action: IncidentsActions.All|SnoozeActions.All) {
  switch (action.type) {
    case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
      return {
        ...state,
        incidents: action.incidents,
      };
    case SnoozeActions.SNOOZE_REQUEST:
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = null;
          }
          return incident;
        })
      };
    case SnoozeActions.SNOOZE_SUCCESS:
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'snoozed';
          }
          return incident;
        })
      };
    case SnoozeActions.UNSNOOZE_REQUEST:
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'active';
          }
          return incident;
        })
      };
    case SnoozeActions.UNDO_SNOOZE:
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'active';
          }
          return incident;
        })
      };
    case IncidentsActions.SELECT_INCIDENT:
      return {
        ...state,
        selectedIncidentIds: [...state.selectedIncidentIds, action.incidentId]
      };
    case IncidentsActions.DESELECT_INCIDENT:
      return {
        ...state,
        selectedIncidentIds: state.selectedIncidentIds.filter(id => id !== action.incidentId)
      };
    default:
      return {...state};
  }
}
