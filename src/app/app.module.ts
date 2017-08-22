import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './heroes/app.component';
import { HeroesComponent }  from './heroes/heroes.component';
import { HeroDetailComponent }  from './heroes/hero-details.component';
import { DashboardComponent }  from './heroes/dashboard.component';
import {HeroService} from './heroes/hero.service';
import {InMemoryDataService} from './heroes/in-memory-data.service';
import {HeroSearchComponent} from './heroes/hero-search.component';
import {IncidentsModule} from './incidents/incidents.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
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
