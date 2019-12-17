import { IStoreState } from "../types";

/** returns the id of the viewport
 */
export function getViewportId(state: IStoreState) {
  return state.references.viewportId;
}

/** returns the id of the editor
 */
export function getEditorId(state: IStoreState) {
  return state.references.editorId;
}
