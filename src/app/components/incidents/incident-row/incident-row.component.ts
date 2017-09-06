import {Component, Input} from '@angular/core';
import {Incident} from '../incident';
import IncidentsStore from '../../../stores/incidents.store';

@Component({
  selector: 'incident-row',
  templateUrl: './incident-row.component.html',
  styleUrls: ['./incident-row.component.css']
})
export class IncidentRow {
  @Input() incident: Incident;

  constructor(private incidentsStore: IncidentsStore) {}

  showIncident() {
    this.incidentsStore.selectIncident(this.incident);
  }
}
