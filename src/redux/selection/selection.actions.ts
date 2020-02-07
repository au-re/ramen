import { ISetSelectionAction } from "./selection.types";

export const SET_SELECTION = "SET_SELECTION";

export function setSelection(selection: string[]): ISetSelectionAction {
  const payload = { selection };
  return { type: SET_SELECTION, payload };
}
