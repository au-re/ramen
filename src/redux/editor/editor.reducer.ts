import { createReducer } from "../utils";
import { SET_PENDING_CONNECTION_END_POS, SET_PENDING_CONNECTION_ORIGIN } from "./editor.actions";
import { IEditorState } from "./editor.types";

const INITIAL_STATE: IEditorState = {
  pendingConnectionOrigin: null,
  pendingConnectionEndPos: null,
};

function pendingConnectionEndPosHandler(state: IEditorState, action: any) {
  const { endPos } = action.payload;
  return { ...state, pendingConnectionEndPos: endPos };
}

function pendingConnectionOriginHandler(state: IEditorState, action: any) {
  const { connectionOrigin } = action.payload;

  if (!connectionOrigin) {
    return { pendingConnectionEndPos: null, pendingConnectionOrigin: null };
  }

  return { ...state, pendingConnectionOrigin: connectionOrigin };
}

const editorReducer = createReducer(INITIAL_STATE, {
  [SET_PENDING_CONNECTION_END_POS]: pendingConnectionEndPosHandler,
  [SET_PENDING_CONNECTION_ORIGIN]: pendingConnectionOriginHandler,
});

export default editorReducer;
