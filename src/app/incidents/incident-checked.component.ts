import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../states/app-state';
import {DeselectIncidentAction, SelectIncidentAction} from '../actions/incidents.actions';

@Component({
  selector: 'incident-checked',
  templateUrl: './incident-checked.component.html',
  styleUrls: ['./incident-checked.component.css']
})
export class IncidentChecked implements OnInit {
  @Input() incidentId: string;
  private isChecked: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('incidentList').subscribe(incidentListState => {
      this.isChecked = incidentListState.selectedIncidentIds.includes(this.incidentId);
    });
  }

  toggle() {
    if (!this.isChecked) {
      this.store.dispatch(new SelectIncidentAction(this.incidentId));
    } else {
      this.store.dispatch(new DeselectIncidentAction(this.incidentId));
    }
  }
}
