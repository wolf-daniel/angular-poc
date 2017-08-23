import * as SnoozeActions from '../actions/snooze.actions';
import {SnoozeInitialState, SnoozeState} from '../states/snooze.state';

export function snoozeReducer(state: SnoozeState = SnoozeInitialState, action: SnoozeActions.All) {
  switch (action.type) {
    case SnoozeActions.GET_SNOOZE_SUCCESS:
      return Object.assign({}, state, {
        snoozedIncidentIds: action.snoozedIncidentIds,
      });
    case SnoozeActions.SNOOZE_REQUEST:
      return Object.assign({}, state, {
        snoozedIncidentIds: [...state.snoozedIncidentIds, action.incidentId],
        ongoingSnoozeIncidentIds: [...state.ongoingSnoozeIncidentIds, action.incidentId]
      });
    case SnoozeActions.SNOOZE_SUCCESS:
      return Object.assign({}, state, {
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      });
    case SnoozeActions.UNSNOOZE_REQUEST:
      return Object.assign({}, state, {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
      });
    case SnoozeActions.CONFIRM_SNOOZE:
      return Object.assign({}, state, {
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      });
    case SnoozeActions.UNDO_SNOOZE:
      return Object.assign({}, state, {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
        ongoingSnoozeIncidentIds: state.ongoingSnoozeIncidentIds.filter(id => id !== action.incidentId)
      });
    default:
      return Object.assign({}, state);
  }
}
