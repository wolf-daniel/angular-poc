import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IncidentsModule} from './components/incidents/incidents.module';
import EventBus from './events/event-bus';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    IncidentsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    EventBus
  ]
})
export class AppModule { }
