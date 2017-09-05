import {Component, Input, OnInit} from '@angular/core';

import SnoozeStore from '../../../stores/snooze.store';
import {Incident} from '../incident';

@Component({
  selector: 'incident-snooze-button',
  templateUrl: './incident-snooze-button.component.html',
  styleUrls: ['./incident-snooze-button.component.css']
})
export class IncidentSnoozeButton implements OnInit {
  @Input() incident: Incident;
  private isSnoozed: boolean;

  constructor(private snoozeStore: SnoozeStore) {}

  ngOnInit(): void {
    this.snoozeStore.snoozedIncidentsIds.subscribe(snoozedIncidentsIds => {
      this.isSnoozed = snoozedIncidentsIds.includes(this.incident.id);
    });
  }

  snooze() {
    if (!this.isSnoozed) {
      this.snoozeStore.snooze(this.incident);
    }
  }

  unsnooze() {
    if (this.isSnoozed) {
      this.snoozeStore.unsnooze(this.incident);
    }
  }
}
