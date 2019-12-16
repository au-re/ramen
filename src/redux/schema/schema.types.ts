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
