import * as SnoozeActions from '../actions/snooze.actions';
import {SnoozeInitialState, SnoozeState} from '../states/snooze.state';

export function snoozeReducer(state: SnoozeState = SnoozeInitialState, action: SnoozeActions.All) {
  switch (action.type) {
    case SnoozeActions.GET_SNOOZE_SUCCESS:
      return {
        snoozedIncidentIds: action.snoozedIncidentIds
      };
    default:
      return state;
  }
}
