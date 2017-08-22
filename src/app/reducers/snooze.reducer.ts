import * as SnoozeActions from '../actions/snooze.actions';
import {SnoozeInitialState, SnoozeState} from '../states/snooze.state';

export function snoozeReducer(state: SnoozeState = SnoozeInitialState, action: SnoozeActions.All) {
  switch (action.type) {
    case SnoozeActions.GET_SNOOZE_SUCCESS:
      return {
        snoozedIncidentIds: action.snoozedIncidentIds
      };
    case SnoozeActions.SNOOZE_REQUEST:
      return {
        snoozedIncidentIds: [...state.snoozedIncidentIds, action.incidentId]
      };
    case SnoozeActions.UNSNOOZE_REQUEST:
      return {
        snoozedIncidentIds: state.snoozedIncidentIds.filter(id => id !== action.incidentId)
      };
    default:
      return state;
  }
}
