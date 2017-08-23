import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import * as SnooozeActions from '../actions/snooze.actions';
import {GetSnoozeSuccessAction, SnoozeAction, SnoozeSuccessAction, UnsnoozeAction, UnsnoozeSuccessAction} from '../actions/snooze.actions';
import {SnoozeBackendService} from '../backend/snooze-backend.service';

@Injectable()
export class SnoozeEffects {
  constructor(private actions: Actions, private snoozeBackendService: SnoozeBackendService) {}

  @Effect() getSnoozeEffect = this.actions
    .ofType(SnooozeActions.GET_SNOOZE_REQUEST)
    .mergeMap(() => this.snoozeBackendService.fetchSnooze()
      .map((snoozedIncidentIds) => new GetSnoozeSuccessAction(snoozedIncidentIds))
    );

  @Effect() snoozeEffect = this.actions
    .ofType(SnooozeActions.SNOOZE_REQUEST)
    .mergeMap((action: SnoozeAction) => this.snoozeBackendService.snooze(action.incidentId)
      .map(() => new SnoozeSuccessAction(action.incidentId))
    );

  @Effect() unsnoozeEffect = this.actions
    .ofType(SnooozeActions.UNSNOOZE_REQUEST)
    .mergeMap((action: UnsnoozeAction) => this.snoozeBackendService.unsnooze(action.incidentId)
      .map(() => new UnsnoozeSuccessAction(action.incidentId))
    );
}
