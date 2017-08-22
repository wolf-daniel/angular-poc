import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as SnooozeActions from '../actions/snooze.actions';
import {Observable} from 'rxjs/Observable';
import {GetSnoozeSuccessAction} from '../actions/snooze.actions';

@Injectable()
export class SnoozeEffects {
  private baseUrl = 'api/snooze';

  constructor(private actions: Actions, private http: Http) {}

  @Effect() getIncidentList = this.actions
    .ofType(SnooozeActions.GET_SNOOZE_REQUEST)
    .switchMap(() => this.fetchSnooze()
      .map((snoozedIncidentIds) => new GetSnoozeSuccessAction(snoozedIncidentIds))
    );

  fetchSnooze(): Observable<string[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data as string[]);
  }
}
