import * as FoldersActions from '../actions/folders.actions';
import {FoldersInitialState, FoldersState} from '../states/folders.state';

export function foldersReducer(state: FoldersState = FoldersInitialState, action: FoldersActions.All) {
  switch (action.type) {
    case FoldersActions.MOVE_TO_FOLDER_REQUEST:
      return {
        folders: state.folders,
        currentFolderId: action.folderId
      };
    default:
      return state;
  }
}
