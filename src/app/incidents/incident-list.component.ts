import {Component, OnInit} from '@angular/core';
import {Incident} from './incident';
import {Store} from '@ngrx/store';

import * as IncidentsActions from '../actions/incidents.actions';
import {IncidentListState} from '../states/incidents.state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents$: Observable<Incident[]>;

  constructor(private store: Store<IncidentListState>) {
    this.incidents$ = store.select('incidents');
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: IncidentsActions.INCIDENT_LIST_GET
    });
  }
}
