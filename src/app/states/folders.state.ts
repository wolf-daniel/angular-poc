import {Folder} from '../components/folders/folder';
export interface FoldersState {
  folders: Folder[];
  currentFolderId: string;
}

export const FoldersInitialState: FoldersState = {
  folders: [
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'snoozed',
      name: 'Snoozed'
    }
  ],
  currentFolderId: 'active'
};
