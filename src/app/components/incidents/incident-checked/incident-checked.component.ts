import {Component, Input, OnInit} from '@angular/core';
import {BaseSelectionsStore} from '../../../stores/base-selections.store';

@Component({
  selector: 'incident-checked',
  templateUrl: './incident-checked.component.html',
  styleUrls: ['./incident-checked.component.css']
})
export class IncidentChecked implements OnInit {
  @Input() incidentId: string;
  private isChecked: boolean;

  constructor(private selectionsStore: BaseSelectionsStore) {}

  ngOnInit(): void {
    this.selectionsStore.selectedIds.subscribe(selectedIds => {
      this.isChecked = selectedIds.includes(this.incidentId);
    });
  }

  toggle(event: MouseEvent) {
    if (this.isChecked) {
      if (event.shiftKey) {
        this.selectionsStore.multiDeselect(this.incidentId);
      } else {
        this.selectionsStore.deselect(this.incidentId);
      }
    } else {
      if (event.shiftKey) {
        this.selectionsStore.multiSelect(this.incidentId);
      } else {
        this.selectionsStore.select(this.incidentId);
      }
    }
  }
}
