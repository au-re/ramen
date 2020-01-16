import { createReducer } from "../utils";
import { HIDE_CONTEXT_MENU, SHOW_CONTEXT_MENU } from "./contextMenu.actions";
import { IContextMenuState, IShowContextMenu } from "./contextMenu.types";

const INITIAL_STATE: IContextMenuState = {
  pos: null,
  visible: false,
  type: null,
};

function showContextMenu(state: IContextMenuState, action: IShowContextMenu) {
  const { type, pos } = action.payload;
  return {
    visible: true,
    type,
    pos,
  };
}

function hideContextMenu() {
  return INITIAL_STATE;
}

const contextMenuReducer = createReducer(INITIAL_STATE, {
  [SHOW_CONTEXT_MENU]: showContextMenu,
  [HIDE_CONTEXT_MENU]: hideContextMenu,
});

export default contextMenuReducer;
