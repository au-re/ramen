interface IControlProps {
  [key: string]: any;
}

export interface ISchemaField {
  id: string;
  name?: string;
  dataType: string;
  controlType?: string;
  hideControlOnInput?: boolean;
  controlProps?: IControlProps;
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
      controlType?: string;
    },
  };
  controlTypes?: {
    [controlTypeId: string]: {
      [name: string]: any,
    },
  };
}
