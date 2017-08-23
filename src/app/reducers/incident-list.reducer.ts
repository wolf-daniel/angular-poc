import * as IncidentsActions from '../actions/incidents.actions';
import * as SnoozeActions from '../actions/snooze.actions';
import {IncidentListInitialState, IncidentListState} from '../states/incidents.state';

export function incidentListReducer(state: IncidentListState = IncidentListInitialState, action: IncidentsActions.All|SnoozeActions.All) {
  switch (action.type) {
    case IncidentsActions.GET_INCIDENT_LIST_SUCCESS:
      return {
        incidents: action.incidents,
        selectedIncidentIds: state.selectedIncidentIds
      };
    case SnoozeActions.SNOOZE_REQUEST:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = null;
          }
          return incident;
        }),
        selectedIncidentIds: state.selectedIncidentIds
      };
    case SnoozeActions.SNOOZE_SUCCESS:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'snoozed';
          }
          return incident;
        }),
        selectedIncidentIds: state.selectedIncidentIds
      };
    case SnoozeActions.UNSNOOZE_REQUEST:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'active';
          }
          return incident;
        }),
        selectedIncidentIds: state.selectedIncidentIds
      };
    case SnoozeActions.UNDO_SNOOZE:
      return {
        incidents: state.incidents.map(incident => {
          if (incident.id === action.incidentId) {
            incident.folderId = 'active';
          }
          return incident;
        }),
        selectedIncidentIds: state.selectedIncidentIds
      };
    case IncidentsActions.SELECT_INCIDENT:
      return {
        incidents: state.incidents,
        selectedIncidentIds: [...state.selectedIncidentIds, action.incidentId]
      };
    case IncidentsActions.DESELECT_INCIDENT:
      return {
        incidents: state.incidents,
        selectedIncidentIds: state.selectedIncidentIds.filter(id => id !== action.incidentId)
      };
    default:
      return state;
  }
}
