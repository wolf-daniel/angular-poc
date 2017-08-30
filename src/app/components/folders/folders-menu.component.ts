import {Component, OnInit} from '@angular/core';
import {countBy} from 'lodash';

import {Folder} from './folder';
import FoldersStore from '../../stores/folders.store';

@Component({
  selector: 'folders-menu',
  templateUrl: './folders-menu.component.html',
  styleUrls: ['./folders-menu.component.css']
})
export class FoldersMenu implements OnInit {
  folders: Folder[];
  currentFolderId: string;

  constructor(private foldersStore: FoldersStore) {
  }

  ngOnInit(): void {
    this.foldersStore.folders.subscribe(folders => this.folders = folders);
    this.foldersStore.currentFolderId.subscribe(currentFolderId => this.currentFolderId = currentFolderId);

    this.foldersStore.getFolders();
  }

  moveToFolder(folderId: string): void {
    this.foldersStore.moveTo(folderId);
  }

  isActive(folderId: string): boolean {
    return this.currentFolderId === folderId;
  }
}
