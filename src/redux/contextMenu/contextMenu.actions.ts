import { IPosition } from "../../types";
import { IShowContextMenu } from "./contextMenu.types";

export const SHOW_CONTEXT_MENU = "SHOW_CONTEXT_MENU";
export const HIDE_CONTEXT_MENU = "HIDE_CONTEXT_MENU";

export function showContextMenu(pos: IPosition, type: string): IShowContextMenu {
  const payload = { pos, type };
  return { type: SHOW_CONTEXT_MENU, payload };
}

export function hideContextMenu() {
  return { type: HIDE_CONTEXT_MENU };
}
