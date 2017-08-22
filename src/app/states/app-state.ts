import {IncidentListState} from './incidents.state';
import {SnoozeState} from './snooze.state';
import {FoldersState} from './folders.state';

export interface AppState {
  incidentList: IncidentListState;
  snooze: SnoozeState;
  folders: FoldersState;
}
