import {Injectable} from '@angular/core';
import {take, remove} from 'lodash';

import {BaseSelectionsStore} from './base-selections.store';
import FoldersStore from './folders.store';
import IncidentsStore from './incidents.store';
import {Incident} from '../components/incidents/incident';

@Injectable()
export default class IncidentsSelectionsStore extends BaseSelectionsStore {
  protected _incidents: Incident[];

  constructor(private incidentsStore: IncidentsStore, private foldersStore: FoldersStore) {
    super();

    this.folderChanged = this.folderChanged.bind(this);

    this.subscribeToStates();
  }

  subscribeToStates() {
    this.foldersStore.currentFolderId.subscribe(this.folderChanged);
    this.incidentsStore.incidents.subscribe(incidents => {
      this._incidents = incidents;
    })
  }

  folderChanged() {
    this.reset();
    this.selectedIds$.next(this._selectedIds);
  }

  multiSelect(id: string) {
    const selectedIndex = this._incidents.findIndex(incident => incident.id === id);
    take(this._incidents, selectedIndex + 1).forEach(incident => {
      if (!this._selectedIds.includes(incident.id)) {
        this._selectedIds.push(incident.id);
      }
    });

    this.selectedIds$.next(this._selectedIds);
  }

  multiDeselect(id: string) {
    const selectedIndex = this._incidents.findIndex(incident => incident.id === id);
    const unselectedIds = take(this._incidents, selectedIndex + 1).map(incident => incident.id);
    remove(this._selectedIds, currentId => unselectedIds.includes(currentId));

    this.selectedIds$.next(this._selectedIds);
  }
}
