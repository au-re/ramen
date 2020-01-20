import { IGraphConnection } from "./redux/connections/connections.types";
import { IEditorState } from "./redux/editor/editor.types";
import { IGraphNode } from "./redux/nodes/nodes.types";
import { ISchema } from "./redux/schema/schema.types";

export interface IPosition {
  x: number;
  y: number;
}

export interface IGraph {
  nodes: IGraphNode[];
  connections: IGraphConnection[];
}

export interface IRamenEvents {
  onGraphChange?: (newGraph: IGraph) => void;
  onConnectionCreate?: (newConnection: IGraphConnection) => void;
  onConnectionDelete?: (deletedConnection: IGraphConnection) => void;
}

export interface IRamenProps extends IRamenEvents {
  initialGraph?: IGraph;
  graph?: IGraph;
  initialEditorState?: IEditorState;
  schema: ISchema;
  height?: number;
  width?: number;
  canZoom?: boolean;
  canPan?: boolean;
  controls?: {
    [controlId: string]: JSX.Element;
  };
  children?: JSX.Element[] | JSX.Element;
}
