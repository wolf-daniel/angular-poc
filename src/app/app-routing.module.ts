import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IncidentList} from './components/incidents/incident-list/incident-list.component';

const routes: Routes = [
  {
    path: 'incidents',
    component: IncidentList
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
