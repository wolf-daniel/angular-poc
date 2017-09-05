import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {remove, merge} from 'lodash';
import 'rxjs/add/operator/mergeMap';

import {Incident} from '../components/incidents/incident';
import {IncidentsBackendService} from '../backend/incidents-backend.service';
import FoldersStore from './folders.store';
import EventBus from '../events/event-bus';
import Events from '../events/events';

@Injectable()
export default class IncidentsStore {
  public incidents$: BehaviorSubject<Incident[]>;
  private _incidents: Incident[];
  public currentFolderId: string;

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this.incidents$ = new BehaviorSubject([]);
    this._incidents = [];

    this.folderChanged = this.folderChanged.bind(this);

    this.subscribeToStates();
    this.subscribeToEvents();
  }

  subscribeToStates() {
    this.foldersStore.currentFolderId.subscribe(this.folderChanged);
  }

  subscribeToEvents() {
    this.bus.events
      .filter(event => event.type === Events.INCIDENT_CHANGED)
      .subscribe(event => this.incidentChanged(event.incident));

    this.bus.events
      .filter(event => event.type === Events.INCIDENT_SNOOZED)
      .subscribe(event => this.incidentSnoozed(event.incidentId));

    this.bus.events
      .filter(event => event.type === Events.INCIDENT_UNSNOOZED)
      .subscribe(event => this.incidentUnsnoozed(event.incidentId));
  }

  getIncidents(): void {
    this.incidentsBackendService.getIncidentsByFolderId(this.currentFolderId)
      .subscribe(incidents => {
        this._incidents = incidents;
        this.incidents$.next(this._incidents);
      })
  }

  incidentChanged(incomingIncident: Incident) {
    if (incomingIncident.folderId !== this.currentFolderId) {
      return
    }

    const existingIncident = this._incidents.find(incident => incident.id === incomingIncident.id);
    if (!existingIncident) {
      this._incidents.push(incomingIncident);
    } else {
      merge(existingIncident, incomingIncident);
    }
  }

  incidentSnoozed(incidentId: string) {
    remove(this._incidents, incident => incident.id === incidentId);
    this.incidents$.next(this._incidents);
  }

  incidentUnsnoozed(incidentId: string) {
    remove(this._incidents, incident => incident.id === incidentId);
    this.incidents$.next(this._incidents);
  }

  folderChanged(folderId: string) {
    this.currentFolderId = folderId;
    this.getIncidents();
  }

  get incidents() {
    return this.incidents$.asObservable();
  }
}
