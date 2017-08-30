import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Incidents} from './components/incidents/incidents.component';

const routes: Routes = [
  {
    path: 'incidents',
    component: Incidents
  },
  {
    path: '',
    redirectTo: '/incidents',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
