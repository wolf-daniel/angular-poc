import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as IncidentsActions from '../actions/incidents.actions';
import {Incident} from '../incidents/incident';

@Injectable()
export class IncidentEffects {
  private baseUrl = 'api/incidents';

  constructor(private actions: Actions, private http: Http) {}

  @Effect() getIncidentList = this.actions
    .ofType(IncidentsActions.INCIDENT_LIST_GET)
    .map((action) => {
      console.log('effects - action:', action);
      return this.fetchIncidents();
    })
    .map((res: any) => {
      console.log('effects - res:', res);
      return res;
    });

  fetchIncidents(): Promise<Incident[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .toPromise()
      .then(response => {
        const data = response.json().data as Incident[];
        console.log('fetchIncidents - data:', data);
        return data;
      });
  }
}
