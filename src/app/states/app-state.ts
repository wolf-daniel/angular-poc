import {IncidentListState} from './incidents.state';
import {SnoozeState} from './snooze.state';

export interface AppState {
  incidentList: IncidentListState;
  snooze: SnoozeState;
}
