import {Component, OnInit} from '@angular/core';

import {Incident} from '../incident';
import SnoozeStore from '../../../stores/snooze.store';
import {Observable} from 'rxjs/Observable';
import IncidentsStore from '../../../stores/incidents.store';

@Component({
  selector: 'snooze-message',
  templateUrl: './snooze-message.component.html',
  styleUrls: ['./snooze-message.component.css']
})
export class SnoozeMessage implements OnInit {
  ongoingSnoozeIncident: Incident;

  constructor(private snoozeStore: SnoozeStore) {}

  ngOnInit(): void {
    this.snoozeStore.ongoing.subscribe(ongoing => {
      this.ongoingSnoozeIncident = ongoing.isOngoing ? ongoing.incident : null;
    });
  }

  undoSnooze() {
    this.snoozeStore.undoSnooze();
  }

  close() {
    this.snoozeStore.confirmSnooze();
  }
}
