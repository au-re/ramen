export interface ISchemaField {
  id: string;
  name?: string;
  dataType: string;
  controlType?: string;
  hideControlOnInput?: boolean;
  defaultValue?: any;
  input?: boolean;
  output?: boolean;
}

export interface ISchema {
  nodeTypes?: {
    [nodeTypeId: string]: {
      name?: string,
      icon?: string,
      width?: number,
      fields?: ISchemaField[],
    },
  };
  dataTypes?: {
    [dataTypeId: string]: {
      name?: string,
      color?: string,
      validTargets?: string[],
    },
  };
  controlTypes?: {
    [controlTypeId: string]: {
      [name: string]: any,
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
  originDataType?: string;
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

export interface IControls {
  [component: string]: any;
}

export interface IDefaultEditorProps {
  controls?: IControls;
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
  getConnectionStart: (connection: IGraphConnection | IGraphConnectionOrigin) => ILocation | null;
  getConnectionEnd: (connection: IGraphConnection) => ILocation | null;
  isFieldInputConnected: (nodeId: string, fieldId: string) => boolean;
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
  controls?: IControls;
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
  dragOrigin?: IGraphConnectionOrigin | null;
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
  height: number;
  width: number;
  onConnectionMouseDown: (connectionId: number) => void;
}

export interface INodeProps {
  id: string;
  name?: string;
  type: string;
  schema: ISchema;
  children?: any;
  controls?: IControls;
  className?: string;
  CustomNode?: any;
  CustomField?: any;
  isFieldInputConnected?: (nodeId: string, fieldId: string) => boolean;
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
