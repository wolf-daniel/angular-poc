import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {IncidentList} from './incident-list.component';
import {IncidentRow} from './incident-row.component';
import {IncidentSnoozeButton} from './incident-snooze-button.component';
import {incidentListReducer} from '../reducers/incident-list.reducer';
import {snoozeReducer} from '../reducers/snooze.reducer';
import {foldersReducer} from '../reducers/folders.reducer';
import {IncidentEffects} from '../effects/incidents.effects';
import {SnoozeEffects} from '../effects/snooze.effects';
import {FoldersMenu} from '../folders/folders-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      incidentList: incidentListReducer,
      snooze: snoozeReducer,
      folders: foldersReducer
    }),
    EffectsModule.forRoot([IncidentEffects, SnoozeEffects]),
  ],
  declarations: [
    FoldersMenu,
    IncidentList,
    IncidentRow,
    IncidentSnoozeButton
  ]
})
export class IncidentsModule {}
