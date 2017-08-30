import {Component, OnInit} from '@angular/core';

import {Incident} from '../incident';

@Component({
  selector: 'snooze-message',
  templateUrl: './snooze-message.component.html',
  styleUrls: ['./snooze-message.component.css']
})
export class SnoozeMessage implements OnInit {
  ongoingSnoozeIncident: Incident;

  constructor() {}

  ngOnInit(): void {
  }

  undoSnooze() {
    // TODO implement this
  }

  close() {
    // TODO implement this
  }
}
