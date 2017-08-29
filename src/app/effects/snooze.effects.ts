import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as SnooozeActions from '../actions/snooze.actions';
import {GetSnoozeSuccessAction, SnoozeAction, SnoozeSuccessAction, UnsnoozeAction, UnsnoozeSuccessAction} from '../actions/snooze.actions';
import {SnoozeBackendService} from '../backend/snooze-backend.service';
import {Store} from '@ngrx/store';
import {AppState} from '../states/app-state';
import {SnoozeState} from '../states/snooze.state';

@Injectable()
export class SnoozeEffects {
  snoozeState: SnoozeState;

  constructor(private actions: Actions, private snoozeBackendService: SnoozeBackendService, private store: Store<AppState>) {
    store.select('snooze').subscribe(state => {
      this.snoozeState = state;
    });
  }

  @Effect() getSnoozeEffect = this.actions
    .ofType(SnooozeActions.GET_SNOOZE_REQUEST)
    .mergeMap(() => this.snoozeBackendService.fetchSnooze()
      .map((snoozedIncidentIds) => new GetSnoozeSuccessAction(snoozedIncidentIds))
    );

  @Effect() snoozeEffect = this.actions
    .ofType(SnooozeActions.SNOOZE_REQUEST)
    .delay(5000)
    .filter((action: SnoozeAction) => {
    console.log('state:', this.snoozeState)
      return this.snoozeState.ongoing.confirmed && this.snoozeState.ongoing.id === action.incidentId
    })
    .mergeMap((action: SnoozeAction) => this.snoozeBackendService.snooze(action.incidentId)
      .map(() => new SnoozeSuccessAction(action.incidentId))
    );

  @Effect() unsnoozeEffect = this.actions
    .ofType(SnooozeActions.UNSNOOZE_REQUEST)
    .mergeMap((action: UnsnoozeAction) => this.snoozeBackendService.unsnooze(action.incidentId)
      .map(() => new UnsnoozeSuccessAction(action.incidentId))
    );
}
