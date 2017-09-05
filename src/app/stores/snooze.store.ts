import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap'
import {remove} from 'lodash'

import IncidentsStore from './incidents.store';
import {SnoozeBackendService} from '../backend/snooze-backend.service';
import EventBus from '../events/event-bus';
import Events from '../events/events';

@Injectable()
export default class SnoozeStore {
  private snoozedIncidentsIds$: BehaviorSubject<string[]>;
  private _snoozedIncidentIds: string[];
  private incidentIds: string[];

  constructor(private snoozeBackendService: SnoozeBackendService, incidentsStore: IncidentsStore, private bus: EventBus) {
    this.snoozedIncidentsIds$ = new BehaviorSubject([]);
    this._snoozedIncidentIds = [];

    incidentsStore.incidents.subscribe(incidents => {
      this.incidentIds = incidents.map(incident => incident.id);
      this.getSnoozes();
    })
  }

  getSnoozes(): void {
    this.snoozeBackendService.getSnoozes(this.incidentIds)
      .subscribe(snoozedIncidentsIds => {
        this._snoozedIncidentIds = snoozedIncidentsIds;
        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds);
      })
  }

  snooze(incidentId: string) {
    this.snoozeBackendService.snooze(incidentId).subscribe(() => {
      if (!this._snoozedIncidentIds.includes(incidentId)) {
        this._snoozedIncidentIds.push(incidentId);
        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds)

        this.bus.events.next({
          type: Events.INCIDENT_SNOOZED,
          incidentId
        });
      }
    });
  }

  unsnooze(incidentId: string) {
    this.snoozeBackendService.unsnooze(incidentId).subscribe(() => {
      if (this._snoozedIncidentIds.includes(incidentId)) {
        remove(this._snoozedIncidentIds, id => id === incidentId);
        this.snoozedIncidentsIds$.next(this._snoozedIncidentIds)

        this.bus.events.next({
          type: Events.INCIDENT_UNSNOOZED,
          incidentId
        });
      }
    });
  }

  get snoozedIncidentsIds() {
    return this.snoozedIncidentsIds$.asObservable();
  }
}
