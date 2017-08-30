import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {remove} from 'lodash'
import 'rxjs/add/operator/mergeMap'

import {Incident} from '../components/incidents/incident';
import {IncidentsBackendService} from '../backend/incidents-backend.service';
import FoldersStore from './folders.store';
import EventBus from '../utils/event-bus';

@Injectable()
export default class IncidentsStore {
  public incidents$: BehaviorSubject<Incident[]>;
  private _incidents: Incident[];
  public currentFolderId: string;

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this.incidents$ = new BehaviorSubject([]);
    this._incidents = [];

    this.foldersStore.currentFolderId.subscribe(currentFolderId => {
      this.currentFolderId = currentFolderId;
      this.getIncidents();
    });

    this.bus.events
      .filter(event => {
        console.log('filter - event:', event);
        return event.type === 'INCIDENT_SNOOZED'
      })
      .subscribe(event => {
        console.log('subscribe - event:', event);
        this.incidentSnoozed(event.incidentId)
      });
  }

  getIncidents(): void {
    this.incidentsBackendService.getIncidentsByFolderId(this.currentFolderId)
      .subscribe(incidents => {
        this._incidents = incidents;
        this.incidents$.next(this._incidents);
      })
  }

  incidentSnoozed(incidentId: string) {
    remove(this._incidents, incident => incident.id === incidentId);
    this.incidents$.next(this._incidents);
  }

  get incidents() {
    return this.incidents$.asObservable();
  }
}
