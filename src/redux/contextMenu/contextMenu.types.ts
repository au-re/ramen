import { IPosition } from "../../types";

export interface IContextMenuState {
  pos: IPosition;
  visible: boolean;
  type: string;
}

export interface IShowContextMenu {
  type: string;
  payload: {
    pos: IPosition;
    type: string;
  };
}
