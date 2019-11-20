export interface ISchemaField {
  id: string;
  name?: string;
  type: string;
}

export interface ISchemaFieldInput extends ISchemaField {
  control?: string;
}

export interface ISchema {
  nodeTypes: {
    [nodeTypeId: string]: {
      name?: string,
      icon?: string,
      controls?: string[],
      fields?: {
        in?: ISchemaFieldInput[],
        out?: ISchemaField[],
      },
    },
  };
  socketTypes: {
    [socketTypeId: string]: {
      color?: string,
      validTargets?: string[],
    },
  };
}

export interface IGraphNodeProps {
  x?: number;
  y?: number;
  zoomLevel?: number;
  name?: string;
  width?: number;
  onDrop?: (e: any, data: any) => void;
  onDrag?: (e: any, data: any) => void;
  children?: any;
}

export interface IGraphNode {
  id: string;
  x: number;
  y: number;
  name?: string;
  type: string;
}

export interface IGraphConnection {
  originNode: string;
  originPin: string;
  targetNode: string;
  targetPin: string;
}

export interface IGraph {
  nodes: IGraphNode[];
  connections: IGraphConnection[];
}

export interface IEditorProps {
  editorHeight?: number;
  editorWidth?: number;
  zoom?: boolean;
  pan?: boolean;
  schema: ISchema;
  initialGraph?: IGraph;
  graph?: IGraph;
  onConnectionCanceled?: (connection: IGraphConnection) => void;
  onGraphChange?: (graph: IGraph) => void;
  onConnectionComplete?: (connection: IGraphConnection) => void;
}

export interface IZoomPanProps {
  zoom: boolean;
  pan: boolean;

}
