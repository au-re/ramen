import { IConnectionsState } from "./connections/connections.types";
import { IEditorState } from "./editor/editor.types";
import { INodesState } from "./nodes/nodes.types";
import { IViewportState } from "./viewport/viewport.types";

export interface IStoreState {
  editor: IEditorState;
  viewport: IViewportState;
  nodes: INodesState;
  connections: IConnectionsState;
  graph: any;
  schema: any;
}
