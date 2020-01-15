import { IStoreState } from "../types";
import { ISelection } from "./selection.types";

/** returns an array with the ids of selected elements
 */
export function getSelection(state: IStoreState): ISelection {
  return state.selection || {};
}

// export function canDragSelect(state: IStoreState): boolean {
//   const canSelect = !pendingConnectionOrigin
// }
