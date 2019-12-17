import { IConnectionsState } from "./connections/connections.types";
import { IEditorState } from "./editor/editor.types";
import { INodesState } from "./nodes/nodes.types";
import { ISchema } from "./schema/schema.types";
import { IViewportState } from "./viewport/viewport.types";

export interface IStoreState {
  references: {
    editorId: string;
    viewportId: string;
  };
  editor: IEditorState;
  viewport: IViewportState;
  nodes: INodesState;
  connections: IConnectionsState;
  schema: ISchema;
}
