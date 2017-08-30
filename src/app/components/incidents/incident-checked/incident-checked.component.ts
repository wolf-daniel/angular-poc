import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'incident-checked',
  templateUrl: './incident-checked.component.html',
  styleUrls: ['./incident-checked.component.css']
})
export class IncidentChecked implements OnInit {
  @Input() incidentId: string;
  private isChecked: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  toggle() {
  }
}
