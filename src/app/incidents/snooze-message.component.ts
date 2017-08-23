
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../states/app-state';
import {IncidentListState} from '../states/incidents.state';
import {SnoozeState} from '../states/snooze.state';
import {Incident} from './incident';
import {ConfirmSnoozeAction, UndoSnoozeAction} from '../actions/snooze.actions';

@Component({
  selector: 'snooze-message',
  templateUrl: './snooze-message.component.html',
  styleUrls: ['./snooze-message.component.css']
})
export class SnoozeMessage implements OnInit {
  ongoingSnoozeIncident: Incident;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    Observable.combineLatest(
      this.store.select('snooze'),
      this.store.select('incidentList'),
      (snoozeState: SnoozeState, incidentListState: IncidentListState) => {
        return snoozeState.ongoingSnoozeIncidentIds.map(id => incidentListState.incidents.find(incident => incident.id === id));
      }
    )
    .subscribe(ongoingSnoozeIncidents => {
      this.ongoingSnoozeIncident = ongoingSnoozeIncidents && ongoingSnoozeIncidents.length ?
        ongoingSnoozeIncidents[0] :
        null;
    });
  }

  undoSnooze() {
    if (this.ongoingSnoozeIncident) {
      this.store.dispatch(new UndoSnoozeAction(this.ongoingSnoozeIncident.id));
    }
  }

  close() {
    if (this.ongoingSnoozeIncident) {
      this.store.dispatch(new ConfirmSnoozeAction(this.ongoingSnoozeIncident.id));
    }
  }
}
