import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {Folder} from './folder';
import {AppState} from '../states/app-state';
import {MoveToFolderAction} from '../actions/folders.actions';
import {Observable} from 'rxjs/Observable';
import {FoldersState} from '../states/folders.state';
import {IncidentListState} from '../states/incidents.state';

@Component({
  selector: 'folders-menu',
  templateUrl: './folders-menu.component.html',
  styleUrls: ['./folders-menu.component.css']
})
export class FoldersMenu implements OnInit {
  folders: Folder[];
  currentFolderId: string;
  counts: Map<string, number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    Observable.combineLatest(
      this.store.select('folders'),
      this.store.select('incidentList'),
      (foldersState: FoldersState, incidentListState: IncidentListState) => {
        const counts = new Map<string, number>();

        foldersState.folders.forEach(folder => {
          counts.set(folder.id, incidentListState.incidents.filter(incident => incident.folderId === folder.id).length);
        });

        return {
          folders: foldersState.folders,
          currentFolderId: foldersState.currentFolderId,
          counts
        };
      }
    )
    .subscribe(foldersState => {
      this.folders = foldersState.folders;
      this.currentFolderId = foldersState.currentFolderId;
      this.counts = foldersState.counts;
    });
  }

  moveToFolder(folderId: string): void {
    this.store.dispatch(new MoveToFolderAction(folderId));
  }

  isActive(folderId: string): boolean {
    return this.currentFolderId === folderId;
  }

  getFolderCount(folderId: string): number {
    return this.counts.get(folderId);
  }
}
