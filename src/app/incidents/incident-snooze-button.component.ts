import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../states/app-state';
import {GetSnoozeAction, SnoozeAction, UnsnoozeAction} from '../actions/snooze.actions';

@Component({
  selector: 'incident-snooze-button',
  templateUrl: './incident-snooze-button.component.html',
  styleUrls: ['./incident-snooze-button.component.css']
})
export class IncidentSnoozeButton implements OnInit {
  @Input() incidentId: string;
  private isSnoozed: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('snooze').subscribe(snoozeState => {
      this.isSnoozed = snoozeState.snoozedIncidentIds.includes(this.incidentId);
    });
    this.store.dispatch(new GetSnoozeAction());
  }

  snooze() {
    if (!this.isSnoozed) {
      this.store.dispatch(new SnoozeAction(this.incidentId));
    }
  }

  unsnooze() {
    if (this.isSnoozed) {
      this.store.dispatch(new UnsnoozeAction(this.incidentId));
    }
  }
}
