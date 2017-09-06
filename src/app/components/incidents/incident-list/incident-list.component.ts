import {Component, OnInit, ViewChild} from '@angular/core';
import {Incident} from '../incident';
import 'rxjs/add/operator/combineLatest';
import {VirtualScrollComponent} from 'angular2-virtual-scroll';

import IncidentsStore from '../../../stores/incidents.store';
import {ChangeEvent} from 'angular2-virtual-scroll';
import FoldersStore from '../../../stores/folders.store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentList implements OnInit {
  incidents: Incident[] = [];

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  constructor(private incidentsStore: IncidentsStore, private foldersStore: FoldersStore) {}

  ngOnInit(): void {
    this.incidentsStore.incidents.subscribe(incidents => {
      this.incidents = incidents;
    });

    this.foldersStore.currentFolderId.subscribe(() => {
      this.virtualScroll.scrollInto(this.incidents[0]);
    });

    this.incidentsStore.getIncidents();
  }

  nextPage(event: ChangeEvent): void {
    if (event.end !== this.incidents.length)
      return;

    this.incidentsStore.nextPage();
  }
}
