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
  className?: string;
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
  xPos?: number;
  yPos?: number;
  zoom?: number;
  nodes: IGraphNode[];
  connections: IGraphConnection[];
}

export interface IEditorProps {
  children?: any;
  height?: number;
  width?: number;
  onConnectionCanceled?: (connection: IGraphConnection) => void;
  onConnectionComplete?: (connection: IGraphConnection) => void;
}

export interface IZoomPanProps {
  zoom: boolean;
  pan: boolean;
}

export interface ILocation {
  x: number;
  y: number;
}

export interface IRamenContext {
  graph: IGraph;
  schema: ISchema;
  updateNodeLocation: (nodeId: string, location: ILocation) => void;
  setGraph: (graph: IGraph) => void;
  setZoomLevel: (zoomLevel: number) => void;
  createConnection: (connection: IGraphConnection) => void;
  deleteConnection: (connectionId: number) => void;
  getConnectionStart: (connection: IGraphConnection) => ILocation | null;
  getConnectionEnd: (connection: IGraphConnection) => ILocation | null;
}

export interface IRamenProviderProps {
  children: any;
  schema: ISchema;
  initialGraph?: IGraph;
  graph?: IGraph;
  onGraphChange?: (graph: IGraph) => void;
}

export interface INodeLayer {
  onNodeDrag: (nodeId: string, newLocation: ILocation) => void;
  onNodeDrop: (nodeId: string, newLocation: ILocation) => void;
}
