import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HeroesComponent }  from './heroes.component';
import { HeroDetailComponent }  from './hero-details.component';
import { DashboardComponent }  from './dashboard.component';
import {HeroService} from './hero.service';
import {InMemoryDataService} from './in-memory-data.service';
import {HeroSearchComponent} from './hero-search.component';
import {IncidentsModule} from '../incidents/incidents.module';
import {EffectsModule} from '@ngrx/effects';
import {IncidentEffects} from '../effects/incidents.effects';
import {AppReducer} from '../reducers/app.reducer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([IncidentEffects]),
    AppRoutingModule,
    IncidentsModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    HeroService
  ]
})
export class AppModule { }
