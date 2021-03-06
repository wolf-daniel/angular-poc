import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {Incidents} from './incidents.component';
import {IncidentList} from './incident-list/incident-list.component';
import {IncidentRow} from './incident-row/incident-row.component';
import {IncidentSnoozeButton} from './incident-snooze-button/incident-snooze-button.component';
import {incidentListReducer} from '../../reducers/incident-list.reducer';
import {snoozeReducer} from '../../reducers/snooze.reducer';
import {foldersReducer} from '../../reducers/folders.reducer';
import {IncidentEffects} from '../../effects/incidents.effects';
import {SnoozeEffects} from '../../effects/snooze.effects';
import {FoldersMenu} from '../folders/folders-menu.component';
import {IncidentsBackendService} from '../../backend/incidents-backend.service';
import {SnoozeBackendService} from '../../backend/snooze-backend.service';
import {SnoozeMessage} from './snooze-message/snooze-message.component';
import {IncidentChecked} from './incident-checked/incident-checked.component';
import {IncidentListTopBar} from './incident-list-top-bar/incident-list-top-bar.component';

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
    Incidents,
    FoldersMenu,
    IncidentList,
    IncidentRow,
    IncidentChecked,
    IncidentSnoozeButton,
    IncidentListTopBar,
    SnoozeMessage
  ],
  providers: [
    IncidentsBackendService,
    SnoozeBackendService
  ]
})
export class IncidentsModule {}
