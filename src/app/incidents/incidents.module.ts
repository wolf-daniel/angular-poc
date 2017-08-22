import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {IncidentList} from './incident-list.component';
import {IncidentRow} from './incident-row.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    IncidentList,
    IncidentRow
  ]
})
export class IncidentsModule {}
