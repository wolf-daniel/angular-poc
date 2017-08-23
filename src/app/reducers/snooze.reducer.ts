import * as SnoozeActions from '../actions/snooze.actions';
import {SnoozeInitialState, SnoozeState} from '../states/snooze.state';

export function snoozeReducer(state: SnoozeState = SnoozeInitialState, action: SnoozeActions.All) {
  switch (action.type) {
    case SnoozeActions.GET_SNOOZE_SUCCESS:
      return {
        snoozedIncidentIds: action.snoozedIncidentIds,
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds
      };
    case SnoozeActions.SNOOZE_REQUEST:
      return {
        snoozedIncidentIds: [...state.snoozedIncidentIds, action.incidentId],
        ongoingSnoozeIncidentIds: [...state.ongoingSnoozeIncidentIds, action.incidentId]
      };
    case SnoozeActions.SNOOZE_SUCCESS:
      return {
        snoozedIncidentIds: state.snoozedIncidentIds,
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      };
    case SnoozeActions.UNSNOOZE_REQUEST:
      return {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds
      };
    case SnoozeActions.CONFIRM_SNOOZE:
      return {
        snoozedIncidentIds: state.snoozedIncidentIds,
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      };
    case SnoozeActions.UNDO_SNOOZE:
      return {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      };
    default:
      return state;
  }
}
