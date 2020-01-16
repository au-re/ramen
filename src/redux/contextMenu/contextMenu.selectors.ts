import { IStoreState } from "../types";

export function getContextMenu(state: IStoreState) {
  return state.contextMenu;
}
