import {Component} from '@angular/core';

import {BaseSelectionsStore} from '../../stores/base-selections.store';
import IncidentsSelectionsStore from '../../stores/incidents-selections.store';

@Component({
  selector: 'incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
  providers: [
    {provide: BaseSelectionsStore, useClass: IncidentsSelectionsStore}
  ]
})
export class Incidents {}
