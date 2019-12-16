import { IStoreState } from "../types";

export function getEditor(state: IStoreState) {
  return state.editor;
}

export function getPendingConnection(state: IStoreState) {
  return state.editor.pendingConnectionOrigin;
}
