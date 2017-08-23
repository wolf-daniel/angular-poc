import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import * as IncidentsActions from '../actions/incidents.actions';
import {GetIncidentListSuccessAction} from '../actions/incidents.actions';
import {IncidentsBackendService} from '../backend/incidents-backend.service';

@Injectable()
export class IncidentEffects {
  constructor(private actions: Actions, private incidentsBackendService: IncidentsBackendService) {}

  @Effect() getIncidentList = this.actions
    .ofType(IncidentsActions.GET_INCIDENT_LIST_REQUEST)
    .mergeMap(() => this.incidentsBackendService.fetchIncidents()
      .map((incidents) => new GetIncidentListSuccessAction(incidents))
    );
}
