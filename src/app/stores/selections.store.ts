import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {remove} from 'lodash';
import FoldersStore from './folders.store';

@Injectable()
export default class SelectionsStore {
  public selectedIds$: BehaviorSubject<string[]>;
  private _selectedIds: string[];

  constructor(private foldersStore: FoldersStore) {
    this.reset();
    this.selectedIds$ = new BehaviorSubject(this._selectedIds);

    this.folderChanged = this.folderChanged.bind(this);

    this.subscribeToStates();
  }

  subscribeToStates() {
    this.foldersStore.currentFolderId.subscribe(this.folderChanged);
  }

  select(id: string) {
    if (!this._selectedIds.includes(id)) {
      this._selectedIds.push(id);
      this.selectedIds$.next(this._selectedIds);
    }
  }

  unselect(id: string) {
    if (this._selectedIds.includes(id)) {
      remove(this._selectedIds, currentId => currentId === id);
      this.selectedIds$.next(this._selectedIds);
    }
  }

  folderChanged() {
    this.reset();
    this.selectedIds$.next(this._selectedIds);
  }

  reset() {
    this._selectedIds = [];
  }

  get selectedIds() {
    return this.selectedIds$.asObservable();
  }
}
