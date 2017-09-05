import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap'
import {remove} from 'lodash'

import IncidentsStore from './incidents.store';
import {SnoozeBackendService} from '../backend/snooze-backend.service';
import EventBus from '../events/event-bus';
import Events from '../events/events';
import AppConstants from '../constants';
import {Incident} from '../components/incidents/incident';

export interface OngoingSnooze {
  incident: Incident;
  isOngoing: boolean;
  isConfirmed: boolean;
}

@Injectable()
export default class SnoozeStore {
  private snoozedIncidentsIds$: BehaviorSubject<string[]>;
  private ongoing$: BehaviorSubject<OngoingSnooze>;

  private _snoozedIncidentIds: string[];
  private _allIncidentIds: string[];
  private _ongoing: OngoingSnooze;

  constructor(private snoozeBackendService: SnoozeBackendService, private incidentsStore: IncidentsStore, private bus: EventBus) {
    this._snoozedIncidentIds = [];

    this.resetOngoing();

    this.snoozedIncidentsIds$ = new BehaviorSubject(this._snoozedIncidentIds);
    this.ongoing$ = new BehaviorSubject(this._ongoing);

    this.subscribeToStates();
  }

  resetOngoing() {
    this._ongoing = {
      incident: null,
      isOngoing: false,
      isConfirmed: false
    };
  }

  subscribeToStates() {
    this.incidentsStore.incidents.subscribe(incidents => {
      this._allIncidentIds = incidents.map(incident => incident.id);
      this.getSnoozes();
    })
  }

  getSnoozes(): void {
    this.snoozeBackendService.getSnoozes(this._allIncidentIds)
      .subscribe(snoozedIncidentsIds => {
        this._snoozedIncidentIds = snoozedIncidentsIds;
        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds);
      })
  }

  snooze(incident: Incident) {
    this.optimisticSnooze(incident);

    setTimeout(() => {
      if (this._ongoing.incident && this._ongoing.isConfirmed) {
        this.actualSnooze(incident);
      }
    }, AppConstants.SNOOZE_DELAY_MILLIS);
  }

  unsnooze(incident: Incident) {
    this.snoozeBackendService.unsnooze(incident.id).subscribe(() => {
      if (this._snoozedIncidentIds.includes(incident.id)) {
        remove(this._snoozedIncidentIds, id => id === incident.id);
        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds);

        incident.folderId = null;

        this.bus.events.next({
          type: Events.INCIDENT_CHANGED,
          incident
        });
      }
    });
  }

  undoSnooze() {
    remove(this._snoozedIncidentIds, incidentId => incidentId === this._ongoing.incident.id);
    this.bus.events.next({
      type: Events.INCIDENT_CHANGED,
      incident: this._ongoing.incident
    });

    this.resetOngoing();

    this.snoozedIncidentsIds$.next(this._snoozedIncidentIds);
    this.ongoing$.next(this._ongoing);
  }

  confirmSnooze() {
    this._ongoing.isConfirmed = true;
    this._ongoing.isOngoing = false;
    this.ongoing$.next(this._ongoing);
  }

  protected optimisticSnooze(incident: Incident) {
    this._ongoing.incident = incident;
    this._ongoing.isOngoing = true;
    this._ongoing.isConfirmed = true;

    this.ongoing$.next(this._ongoing);

    incident.folderId = 'snoozed';

    this.bus.events.next({
      type: Events.INCIDENT_CHANGED,
      incident
    });
  }

  protected actualSnooze(incident: Incident) {
    this.snoozeBackendService.snooze(incident.id).subscribe(() => {
      if (!this._snoozedIncidentIds.includes(incident.id)) {
        this._snoozedIncidentIds.push(incident.id);
        this.resetOngoing();

        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds);
        this.ongoing$.next(this._ongoing);
      }
    });
  }

  get snoozedIncidentsIds() {
    return this.snoozedIncidentsIds$.asObservable();
  }

  get ongoing() {
    return this.ongoing$.asObservable();
  }
}
