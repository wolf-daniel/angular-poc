import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/rx';
import IncidentsStore from '../../../stores/incidents.store';

@Component({
  selector: 'incident-list-top-bar',
  templateUrl: './incident-list-top-bar.component.html',
  styleUrls: ['./incident-list-top-bar.component.css']
})
export class IncidentListTopBar implements OnInit {
  selectedIncidentIds: string[];

  constructor(private incidentsStore: IncidentsStore) {}

  ngOnInit(): void {
    this.incidentsStore.selectedIncidentIds.subscribe(selectedIncidentIds => {
      this.selectedIncidentIds = selectedIncidentIds;
    })
  }
}
