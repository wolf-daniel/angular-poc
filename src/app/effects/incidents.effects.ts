import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import * as IncidentsActions from '../actions/incidents.actions';
import {Incident} from '../incidents/incident';
import {Observable} from 'rxjs/Observable';
import {GetIncidentListSuccessAction} from '../actions/incidents.actions';

@Injectable()
export class IncidentEffects {
  private baseUrl = 'api/incidents';

  constructor(private actions: Actions, private http: Http) {}

  @Effect() getIncidentList = this.actions
    .ofType(IncidentsActions.GET_INCIDENT_LIST_REQUEST)
    .mergeMap(() => this.fetchIncidents()
      .map((incidents) => new GetIncidentListSuccessAction(incidents))
    );

  fetchIncidents(): Observable<Incident[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data as Incident[]);
  }
}
