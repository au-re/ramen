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

export interface IGraphNode {
  id: string;
  x: number;
  y: number;
  name?: string;
  type: string;
}

export interface IGraphConnection {
  originNode: string;
  originField: string;
  targetNode: string;
  targetField: string;
}

export interface IGraphConnectionOrigin {
  originNode: string;
  originField: string;
}

export interface IGraph {
  nodes: IGraphNode[];
  connections: IGraphConnection[];
}

export interface IEditorState {
  zoom: number;
  xPos: number;
  yPos: number;
}

export interface IComponents {
  [component: string]: any;
}

export interface IDefaultEditorProps {
  components?: IComponents;
  canZoom?: boolean;
  canPan?: boolean;
  height?: number;
  width?: number;
}

export interface IGraphContext {
  graph: IGraph;
  schema: ISchema;
  updateNodeLocation: (nodeId: string, location: ILocation) => void;
  setGraph: (graph: IGraph) => void;
  createConnection: (connection: IGraphConnection) => void;
  deleteConnection: (connectionId: number) => void;
  getConnectionStart: (connection: IGraphConnection) => ILocation | null;
  getConnectionEnd: (connection: IGraphConnection) => ILocation | null;
}

export interface ISelectionProvider {
  selection: string[];
  updateSelection: () => void;
}

export interface IZoomPanWrapperProps extends IReactProps {
  zoomSpeed?: number;
  zoom?: number;
  xPos?: number;
  yPos?: number;
  minZoom?: number;
  maxZoom?: number;
  maxX?: number;
  minX?: number;
  maxY?: number;
  minY?: number;
  canZoom?: boolean;
  canPan?: boolean;
  padding?: number;
}

export interface INodeLayerProps {
  nodes?: IGraphNode[];
  selection?: string[];
  onNodeDrag?: (nodeId: string, newLocation: ILocation) => void;
  onNodeDrop?: (nodeId: string, newLocation: ILocation) => void;
  onNodeClick?: (nodeId: string) => void;
  onFieldOutMouseDown?: (nodeId: string, fieldId: string) => void;
  onFieldInMouseUp?: (nodeId: string, fieldId: string) => void;
}

export interface IRamenProvider extends IReactProps {
  schema: ISchema;
  initialGraph?: IGraph;
  graph?: IGraph;
  editorState?: IEditorState;
  onGraphChange?: (newGraph: IGraph) => void;
}

export interface IEditorProvider extends IReactProps {
  initialEditorState?: IEditorState;
  onEditorStateChange?: (newState: IEditorState) => void;
}

export interface IEditorContext {
  zoom: number;
  xPos: number;
  yPos: number;
  dragOrigin?: IGraphConnection | null;
  mousePos?: ILocation;
  setDragOrigin?: (connectionOrigin: IGraphConnectionOrigin) => void;
  setPosition?: (newXPos: number, newYPos: number) => void;
  setZoomLevel?: (zoomLevel: number, newXPos: number, newYPos: number) => void;
}

export interface INoodleProps {
  start: ILocation;
  end: ILocation;
  onMouseDown?: () => void;
}

export interface INoodleLayerProps {
  onConnectionMouseDown: (connectionId: number) => void;
}

export interface INodeProps {
  x?: number;
  y?: number;
  node: IGraphNode;
  children?: any;
  className?: string;
  CustomNode?: any;
  CustomField?: any;
  onFieldOutMouseDown?: (nodeId: string, fieldId: string) => void;
  onFieldInMouseUp?: (nodeId: string, fieldId: string) => void;
}

export interface IGraphProviderProps {
  children: any;
  schema: ISchema;
  initialGraph?: IGraph;
  graph?: IGraph;
  onGraphChange?: (graph: IGraph) => void;
}

export interface IReactProps {
  children?: any;
  id?: string;
  className?: string;
  key?: any;
}

export interface ILocation {
  x: number;
  y: number;
}
