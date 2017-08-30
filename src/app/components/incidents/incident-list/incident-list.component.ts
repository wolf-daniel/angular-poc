import {Component, OnInit} from '@angular/core';
import {Incident} from '../incident';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import IncidentsStore from '../../../stores/incidents.store';
import FoldersStore from '../../../stores/folders.store';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents$: Observable<Incident[]>;

  constructor(private incidentsStore: IncidentsStore) {
    this.incidents$ = incidentsStore.incidents;
  }

  ngOnInit(): void {
    this.incidentsStore.getIncidents();
  }
}
