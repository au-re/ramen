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
  history: {
    past: [{
      nodes: INodesState,
      connections: IConnectionsState,
    }];
    present: {
      nodes: INodesState,
      connections: IConnectionsState,
    };
    future: [{
      nodes: INodesState,
      connections: IConnectionsState,
    }];
  };
  selection: {
    [elementId: string]: boolean,
  };
  schema: ISchema;
}
