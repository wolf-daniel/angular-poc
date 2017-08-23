import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import * as SnooozeActions from '../actions/snooze.actions';
import {Observable} from 'rxjs/Observable';
import {GetSnoozeSuccessAction, SnoozeAction, SnoozeSuccessAction, UnsnoozeAction, UnsnoozeSuccessAction} from '../actions/snooze.actions';

@Injectable()
export class SnoozeEffects {
  private baseUrl = 'api/snooze';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private actions: Actions, private http: Http) {}

  @Effect() getSnoozeEffect = this.actions
    .ofType(SnooozeActions.GET_SNOOZE_REQUEST)
    .mergeMap(() => this.fetchSnooze()
      .map((snoozedIncidentIds) => new GetSnoozeSuccessAction(snoozedIncidentIds))
    );

  @Effect() snoozeEffect = this.actions
    .ofType(SnooozeActions.SNOOZE_REQUEST)
    .mergeMap((action: SnoozeAction) => this.snooze(action.incidentId)
      .map(() => new SnoozeSuccessAction(action.incidentId))
    );

  @Effect() unsnoozeEffect = this.actions
    .ofType(SnooozeActions.UNSNOOZE_REQUEST)
    .mergeMap((action: UnsnoozeAction) => this.unsnooze(action.incidentId)
      .map(() => new UnsnoozeSuccessAction(action.incidentId))
    );

  fetchSnooze(): Observable<string[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data.map((item: any) => item.id) as string[]);
  }

  snooze(incidentId: string): Observable<{}> {
    return this.http
      .post(`${this.baseUrl}`, {id: incidentId}, {headers: this.headers})
      .map(response => ({}));
  }

  unsnooze(incidentId: string): Observable<{}> {
    return this.http
      .delete(`${this.baseUrl}/${incidentId}`, {headers: this.headers})
      .map(response => ({}));
  }
}
