import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {remove} from 'lodash';

export interface SelectorsStore {
  select(id: string): void;
  deselect(id: string): void;
  multiSelect(id: string): void;
  multiDeselect(id: string): void;
}

export abstract class BaseSelectionsStore implements SelectorsStore {
  protected selectedIds$: BehaviorSubject<string[]>;
  protected _selectedIds: string[];

  constructor() {
    this.reset();
    this.selectedIds$ = new BehaviorSubject(this._selectedIds);
  }

  select(id: string) {
    if (!this._selectedIds.includes(id)) {
      this._selectedIds.push(id);
      this.selectedIds$.next(this._selectedIds);
    }
  }

  deselect(id: string) {
    if (this._selectedIds.includes(id)) {
      remove(this._selectedIds, currentId => currentId === id);
      this.selectedIds$.next(this._selectedIds);
    }
  }

  abstract multiSelect(id: string): void;

  abstract multiDeselect(id: string): void;

  protected reset() {
    this._selectedIds = [];
  }

  get selectedIds() {
    return this.selectedIds$.asObservable();
  }
}
