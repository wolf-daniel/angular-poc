import {Component, Input, OnInit} from '@angular/core';
import IncidentsStore from '../../../stores/incidents.store';

@Component({
  selector: 'incident-checked',
  templateUrl: './incident-checked.component.html',
  styleUrls: ['./incident-checked.component.css']
})
export class IncidentChecked implements OnInit {
  @Input() incidentId: string;
  private isChecked: boolean;

  constructor(private incidentsStore: IncidentsStore) {}

  ngOnInit(): void {
    this.incidentsStore.selectedIncidentIds.subscribe(selectedIncidentIds => {
      this.isChecked = selectedIncidentIds.includes(this.incidentId);
    });
  }

  toggle() {
    if (this.isChecked) {
      this.incidentsStore.unselectIncident(this.incidentId);
    } else {
      this.incidentsStore.selectIncident(this.incidentId);
    }
  }
}
