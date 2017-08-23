import {Component, OnInit} from '@angular/core';
import {Incident} from './incident';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/rx';

import {GetIncidentListAction} from '../actions/incidents.actions';
import {AppState} from '../states/app-state';
import {IncidentListState} from '../states/incidents.state';
import {FoldersState} from '../states/folders.state';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents: Incident[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    Observable.combineLatest(
      this.store.select('incidentList'),
      this.store.select('folders'),
      (incidentListState: IncidentListState, foldersState: FoldersState) => {
        return incidentListState.incidents.filter(incident => incident.folderId === foldersState.currentFolderId);
      }
    ).subscribe(incidents => {
      this.incidents = incidents;
    });

    this.store.dispatch(new GetIncidentListAction());
  }
}
