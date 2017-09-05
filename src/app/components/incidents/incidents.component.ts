import {Component} from '@angular/core';

import SelectionsStore from '../../stores/selections.store';

@Component({
  selector: 'incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
  providers: [
    SelectionsStore
  ]
})
export class Incidents {}
