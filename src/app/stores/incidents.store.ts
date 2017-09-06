import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {clone, remove, merge} from 'lodash';
import 'rxjs/add/operator/mergeMap';

import {Incident} from '../components/incidents/incident';
import {IncidentsBackendService} from '../backend/incidents-backend.service';
import FoldersStore from './folders.store';
import EventBus from '../events/event-bus';
import Events from '../events/events';

@Injectable()
export default class IncidentsStore {
  private incidents$: BehaviorSubject<Incident[]>;
  private displayedIncident$: BehaviorSubject<Incident>;

  private _incidents: Incident[];
  private _currentFolderId: string;
  private _displayedIncident: Incident;

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this._incidents = [];
    this._displayedIncident = null;

    this.incidents$ = new BehaviorSubject(this._incidents);
    this.displayedIncident$ = new BehaviorSubject(this._displayedIncident);

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
  }

  getIncidents(): void {
    this.fetchIncidents();
  }

  nextPage(): void {
    this.fetchIncidents(this._incidents.length);
  }

  getFullIncident(incidentId: string) {
    this.incidentsBackendService.getFullIncident(incidentId).subscribe(incident => {
      this._displayedIncident = incident;
      this.displayedIncident$.next(this._displayedIncident);
    });
  }

  selectIncident(incident: Incident) {
    this._displayedIncident = incident;
    this.displayedIncident$.next(this._displayedIncident);
  }

  incidentChanged(incomingIncident: Incident) {
    const existingIncident = this._incidents.find(incident => incident.id === incomingIncident.id);

    if (!existingIncident) {
      this.incidentAdded(incomingIncident);
    } else {
      if (incomingIncident.folderId !== this._currentFolderId) {
        this.incidentChangedFolder(incomingIncident);
      } else {
        this.incidentUpdated(incomingIncident, existingIncident);
      }
    }

    // Make sure to also update the displayed incident.
    if (this._displayedIncident && this._displayedIncident.id === incomingIncident.id) {
      merge(this._displayedIncident, incomingIncident);
      this.displayedIncident$.next(clone(this._displayedIncident));
    }

    this.incidents$.next(clone(this._incidents));
  }

  protected incidentAdded(incomingIncident: Incident) {
    if (incomingIncident.folderId === this._currentFolderId) {
      this._incidents.push(incomingIncident);
    }
  }

  protected incidentChangedFolder(incomingIncident: Incident) {
    if (incomingIncident.folderId !== this._currentFolderId) {
      remove(this._incidents, incident => incident.id === incomingIncident.id)
    }
  }

  protected incidentUpdated(incomingIncident: Incident, existingIncident: Incident) {
    merge(existingIncident, incomingIncident);
  }

  folderChanged(folderId: string) {
    this._currentFolderId = folderId;
    this._displayedIncident = null;
    this.getIncidents();
    this.displayedIncident$.next(this._displayedIncident);
  }

  protected fetchIncidents(fromIndex: number = 0) {
    this.incidentsBackendService.getIncidents(this._currentFolderId, fromIndex)
      .subscribe(incidents => {
        if (fromIndex < this._incidents.length) {
          this._incidents = incidents;
        } else {
          this._incidents.push(...incidents);
        }

        this.incidents$.next(this._incidents);
      })
  }

  get incidents() {
    return this.incidents$.asObservable();
  }

  get displayedIncident() {
    return this.displayedIncident$.asObservable();
  }
}
