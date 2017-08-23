import * as FoldersActions from '../actions/folders.actions';
import {FoldersInitialState, FoldersState} from '../states/folders.state';

export function foldersReducer(state: FoldersState = FoldersInitialState, action: FoldersActions.All) {
  switch (action.type) {
    case FoldersActions.MOVE_TO_FOLDER_REQUEST:
      return Object.assign({}, state, {
        currentFolderId: action.folderId
      });
    default:
      return Object.assign({}, state);
  }
}
