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

  constructor(private store: Store<AppState>) {
    store.select('snooze').subscribe(snooze => {
      this.isSnoozed = snooze.snoozedIncidentIds.includes(this.incidentId);
    });
  }

  ngOnInit(): void {
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
