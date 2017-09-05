import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {remove, merge} from 'lodash';
import 'rxjs/add/operator/mergeMap';

import {Incident} from '../components/incidents/incident';
import {IncidentsBackendService} from '../backend/incidents-backend.service';
import FoldersStore from './folders.store';
import EventBus from '../events/event-bus';
import Events from '../events/events';
import AppConstants from '../constants';

@Injectable()
export default class IncidentsStore {
  public incidents$: BehaviorSubject<Incident[]>;
  private _incidents: Incident[];
  private currentFolderId: string;
  private currentPage: number;

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this.incidents$ = new BehaviorSubject([]);
    this._incidents = [];
    this.currentPage = 1;

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
    this.incidentsBackendService.getIncidents(this.currentFolderId, this.currentPage)
      .subscribe(incidents => {
        this._incidents = incidents;
        this.incidents$.next(this._incidents);
      })
  }

  getNextIncidents(): void {
    this.incidentsBackendService.getIncidents(this.currentFolderId, this.currentPage)
      .subscribe(incidents => {
        this._incidents.push(...incidents);
        this.incidents$.next(this._incidents);
      })
  }

  nextPage(): void {
    if ((this.currentPage) * AppConstants.INCIDENTS_PAGE_SIZE === this._incidents.length) {
      this.currentPage++;
      this.getNextIncidents();
    }
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
    this.resetPage();
    this.getIncidents();
  }

  resetPage() {
    this.currentPage = 1;
  }

  get incidents() {
    return this.incidents$.asObservable();
  }
}
