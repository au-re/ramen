import { IStoreState } from "../types";

export function getViewport(state: IStoreState) {
  return state.viewport;
}
