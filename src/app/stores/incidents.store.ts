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
  public selectedIncidentIds$: BehaviorSubject<string[]>;

  private _incidents: Incident[];
  private _currentFolderId: string;
  private _currentPage: number;
  private _selectedIncidentsIds: string[];

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this._incidents = [];

    this.resetPage();
    this.resetSelectedIncidentIds();

    this.incidents$ = new BehaviorSubject(this._incidents);
    this.selectedIncidentIds$ = new BehaviorSubject(this._selectedIncidentsIds);

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
    this.fetchIncidents();
  }

  nextPage(): void {
    if ((this._currentPage) * AppConstants.INCIDENTS_PAGE_SIZE === this._incidents.length) {
      this._currentPage++;
      this.fetchIncidents(true);
    }
  }

  incidentChanged(incomingIncident: Incident) {
    if (incomingIncident.folderId !== this._currentFolderId) {
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
    this._currentFolderId = folderId;
    this.resetSelectedIncidentIds();
    this.resetPage();
    this.getIncidents();

    this.selectedIncidentIds$.next(this._selectedIncidentsIds);
  }

  selectIncident(incidentId: string) {
    if (!this._selectedIncidentsIds.includes(incidentId)) {
      this._selectedIncidentsIds.push(incidentId);
      this.selectedIncidentIds$.next(this._selectedIncidentsIds);
    }
  }

  unselectIncident(incidentId: string) {
    if (this._selectedIncidentsIds.includes(incidentId)) {
      remove(this._selectedIncidentsIds, id => id === incidentId);
      this.selectedIncidentIds$.next(this._selectedIncidentsIds);
    }
  }

  resetPage() {
    this._currentPage = 1;
  }

  resetSelectedIncidentIds() {
    this._selectedIncidentsIds = [];
  }

  protected fetchIncidents(add = false) {
    this.incidentsBackendService.getIncidents(this._currentFolderId, this._currentPage)
      .subscribe(incidents => {
        if (add) {
          this._incidents.push(...incidents);
        } else {
          this._incidents = incidents;
        }

        this.incidents$.next(this._incidents);
      })

  }

  get incidents() {
    return this.incidents$.asObservable();
  }

  get selectedIncidentIds() {
    return this.selectedIncidentIds$.asObservable();
  }
}
