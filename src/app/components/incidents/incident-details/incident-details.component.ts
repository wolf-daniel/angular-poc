import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/first';

import IncidentsStore from '../../../stores/incidents.store';
import {Incident} from '../incident';

@Component({
  selector: 'incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetails implements OnInit {
  incident: Incident;

  constructor(private incidentsStore: IncidentsStore) {}

  ngOnInit(): void {
    this.incidentsStore.displayedIncident.subscribe(incident => {
      this.incident = incident;
    });

    // This is a bug, it calls the store in a loop.
    this.incidentsStore.displayedIncident
      .filter(incident => !!incident)
      .map(incident => incident.id)
      .subscribe(incidentId => {
        this.incidentsStore.getFullIncident(incidentId);
      });
  }
}
