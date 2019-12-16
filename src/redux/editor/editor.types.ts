import { IPosition } from "../../types";
import { IGraphConnectionOrigin } from "../connections/connections.types";

export interface IEditorState {
  pendingConnectionEndPos: IPosition | null;
  pendingConnectionOrigin: IGraphConnectionOrigin | null;
}
