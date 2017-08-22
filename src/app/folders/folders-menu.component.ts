import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {Folder} from './folder';
import {AppState} from '../states/app-state';
import {MoveToFolderAction} from '../actions/folders.actions';

@Component({
  selector: 'folders-menu',
  templateUrl: './folders-menu.component.html',
  styleUrls: ['./folders-menu.component.css']
})
export class FoldersMenu {
  folders: Folder[];
  currentFolderId: string;

  constructor(private store: Store<AppState>) {
    store.select('folders').subscribe(foldersState => {
      this.folders = foldersState.folders;
      this.currentFolderId = foldersState.currentFolderId;
    });
  }

  moveToFolder(folderId: string): void {
    this.store.dispatch(new MoveToFolderAction(folderId));
  }

  isActive(folderId: string): boolean {
    return this.currentFolderId === folderId;
  }
}
