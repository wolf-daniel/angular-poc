import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/rx';

import {AppState} from '../states/app-state';
import {IncidentListState} from '../states/incidents.state';
import {FoldersState} from '../states/folders.state';

@Component({
  selector: 'incident-list-top-bar',
  templateUrl: './incident-list-top-bar.component.html',
  styleUrls: ['./incident-list-top-bar.component.css']
})
export class IncidentListTopBar implements OnInit {
  selectedIncidentIds: string[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    Observable.combineLatest(
      this.store.select('incidentList'),
      this.store.select('folders'),
      (incidentListState: IncidentListState, foldersState: FoldersState) => {
        return incidentListState.incidents.filter(incident => {
          return incident.folderId === foldersState.currentFolderId &&
            incidentListState.selectedIncidentIds.includes(incident.id);
        });
      }
    ).subscribe(incidents => {
      this.selectedIncidentIds = incidents.map(incident => incident.id);
    });
  }
}
