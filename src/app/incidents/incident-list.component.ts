import {Component, OnInit} from '@angular/core';
import {Incident} from './incident';
import {Store} from '@ngrx/store';

import {GetIncidentListAction} from '../actions/incidents.actions';
import {AppState} from '../states/app-state';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents: Incident[];

  constructor(private store: Store<AppState>) {
    store.select('incidentList').subscribe(state => {
      this.incidents = state.incidents;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetIncidentListAction());
  }
}
