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
        ongoing: {
          id: action.incidentId,
          confirmed: false
        }
      });
    case SnoozeActions.SNOOZE_SUCCESS:
      return Object.assign({}, state, {
        ongoing: {
          id: null,
          confirmed: false
        }
      });
    case SnoozeActions.UNSNOOZE_REQUEST:
      return Object.assign({}, state, {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
      });
    case SnoozeActions.CONFIRM_SNOOZE:
      return Object.assign({}, state, {
        ongoing: {
          id: state.ongoing.id,
          confirmed: true
        }
      });
    case SnoozeActions.UNDO_SNOOZE:
      return Object.assign({}, state, {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId),
        ongoing: {
          id: null,
          confirmed: false
        }
      });
    default:
      return Object.assign({}, state);
  }
}
