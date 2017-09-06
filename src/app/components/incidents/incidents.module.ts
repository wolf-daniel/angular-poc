import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER} from '@angular/core';
import {VirtualScrollModule} from 'angular2-virtual-scroll';

import {Incidents} from './incidents.component';
import {IncidentList} from './incident-list/incident-list.component';
import {IncidentRow} from './incident-row/incident-row.component';
import {IncidentSnoozeButton} from './incident-snooze-button/incident-snooze-button.component';
import {FoldersMenu} from '../folders/folders-menu.component';
import {IncidentsBackendService} from '../../backend/incidents-backend.service';
import {SnoozeBackendService} from '../../backend/snooze-backend.service';
import {SnoozeMessage} from './snooze-message/snooze-message.component';
import {IncidentChecked} from './incident-checked/incident-checked.component';
import {IncidentListTopBar} from './incident-list-top-bar/incident-list-top-bar.component';
import IncidentsStore from '../../stores/incidents.store';
import {FoldersBackendService} from '../../backend/folders-backend.service';
import FoldersStore from '../../stores/folders.store';
import SnoozeStore from '../../stores/snooze.store';
import SocketUtil from '../../utils/socket-util.service';
import {IncidentDetails} from './incident-details/incident-details.component';

@NgModule({
  imports: [
    BrowserModule,
    VirtualScrollModule
  ],
  declarations: [
    Incidents,
    FoldersMenu,
    IncidentList,
    IncidentRow,
    IncidentChecked,
    IncidentSnoozeButton,
    IncidentListTopBar,
    IncidentDetails,
    SnoozeMessage
  ],
  providers: [
    IncidentsBackendService,
    SnoozeBackendService,
    FoldersBackendService,
    IncidentsStore,
    FoldersStore,
    SnoozeStore,
    SocketUtil,
    {
      provide: APP_INITIALIZER,
      useFactory: (socketUtil: SocketUtil) => () => socketUtil.connect(),
      deps: [SocketUtil],
      multi: true
    },
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class IncidentsModule {}
