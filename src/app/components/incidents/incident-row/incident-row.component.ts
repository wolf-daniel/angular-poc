import {Component, Input} from '@angular/core';
import {Incident} from '../incident';

@Component({
  selector: 'incident-row',
  templateUrl: './incident-row.component.html',
  styleUrls: ['./incident-row.component.css']
})
export class IncidentRow {
  @Input() incident: Incident;
}
