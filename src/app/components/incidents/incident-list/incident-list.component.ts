import {Component, OnInit} from '@angular/core';
import {Incident} from '../incident';
import 'rxjs/add/operator/combineLatest';

import IncidentsStore from '../../../stores/incidents.store';
import {ChangeEvent} from 'angular2-virtual-scroll';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents: Incident[] = [];

  constructor(private incidentsStore: IncidentsStore) {}

  ngOnInit(): void {
    this.incidentsStore.incidents.subscribe(incidents => {
      this.incidents = incidents;
    });

    this.incidentsStore.getIncidents();
  }

  nextPage(event: ChangeEvent): void {
    if (event.end !== this.incidents.length)
      return;

    this.incidentsStore.nextPage();
  }
}
