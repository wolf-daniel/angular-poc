import {Action} from '@ngrx/store';

export const MOVE_TO_FOLDER_REQUEST = 'MOVE_TO_FOLDER_REQUEST';

export class MoveToFolderAction implements Action {
  readonly type = MOVE_TO_FOLDER_REQUEST;
  constructor(public folderId: string) {}
}

export type All =
  MoveToFolderAction;
