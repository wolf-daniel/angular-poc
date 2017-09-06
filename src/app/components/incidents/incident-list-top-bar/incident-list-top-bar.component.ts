import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/rx';

import {BaseSelectionsStore} from '../../../stores/base-selections.store';

@Component({
  selector: 'incident-list-top-bar',
  templateUrl: './incident-list-top-bar.component.html',
  styleUrls: ['./incident-list-top-bar.component.css']
})
export class IncidentListTopBar implements OnInit {
  selectedIncidentIds: string[];

  constructor(private selectionsStore: BaseSelectionsStore) {}

  ngOnInit(): void {
    this.selectionsStore.selectedIds.subscribe(selectedIds => {
      this.selectedIncidentIds = selectedIds;
    })
  }
}
