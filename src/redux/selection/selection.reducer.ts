import { createReducer, stringArrayToMap } from "../utils";
import { SET_SELECTION } from "./selection.actions";
import { ISetSelectionAction } from "./selection.types";

const INITIAL_STATE = {};

function selectionHandler(state: any, action: ISetSelectionAction) {
  const { selection } = action.payload;

  const newSelection = stringArrayToMap(selection);
  return newSelection;
}

const selectionReducer = createReducer(INITIAL_STATE, {
  [SET_SELECTION]: selectionHandler,
});

export default selectionReducer;
