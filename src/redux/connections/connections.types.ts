export interface IConnectionsState {
  [connectionId: string]: IGraphConnection;
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

export interface IGraphConnectionTarget {
  targetNode: string;
  targetField: string;
}
