import {Component, Input, OnInit} from '@angular/core';
import SelectionsStore from '../../../stores/selections.store';

@Component({
  selector: 'incident-checked',
  templateUrl: './incident-checked.component.html',
  styleUrls: ['./incident-checked.component.css']
})
export class IncidentChecked implements OnInit {
  @Input() incidentId: string;
  private isChecked: boolean;

  constructor(private selectionsStore: SelectionsStore) {}

  ngOnInit(): void {
    this.selectionsStore.selectedIds.subscribe(selectedIds => {
      this.isChecked = selectedIds.includes(this.incidentId);
    });
  }

  toggle() {
    if (this.isChecked) {
      this.selectionsStore.unselect(this.incidentId);
    } else {
      this.selectionsStore.select(this.incidentId);
    }
  }
}
