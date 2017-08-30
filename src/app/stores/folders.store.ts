import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Folder} from '../components/folders/folder';
import {FoldersBackendService} from '../backend/folders-backend.service';

@Injectable()
export default class FoldersStore {
  private folders$: BehaviorSubject<Folder[]>;
  private currentFolderId$: BehaviorSubject<string>;

  constructor(private foldersBackendService: FoldersBackendService) {
    this.folders$ = new BehaviorSubject([]);
    this.currentFolderId$ = new BehaviorSubject('active');
  }

  getFolders(): void {
    this.foldersBackendService.getFolders()
      .subscribe(folders => {
        this.folders$.next(folders);
      })
  }

  moveTo(folderId: string) {
    this.currentFolderId$.next(folderId);
  }

  get folders() {
    return this.folders$.asObservable();
  }

  get currentFolderId() {
    return this.currentFolderId$.asObservable();
  }
}
