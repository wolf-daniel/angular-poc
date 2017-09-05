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
  public incidents$: BehaviorSubject<Incident[]>;

  private _incidents: Incident[];
  private _currentFolderId: string;

  constructor(private incidentsBackendService: IncidentsBackendService, private foldersStore: FoldersStore, private bus: EventBus) {
    this._incidents = [];

    this.incidents$ = new BehaviorSubject(this._incidents);

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
    this.getIncidents();
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
}
