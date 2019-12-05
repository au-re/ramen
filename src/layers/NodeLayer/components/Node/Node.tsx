import get from "lodash.get";
import React from "react";

import { FIELD_HEIGHT, NODE_WIDTH } from "../../../../constants";
import { INodeProps, ISchemaField } from "../../../../types";
import DefaultControl from "../DefaultControl/DefaultControl";
import DefaultField from "../Field/Field";
import { NodeSubtitle, NodeTitle, NodeWrapper as DefaultNode } from "./Node.styles";

function Node(props: INodeProps) {
  const {
    id,
    name,
    type,
    schema,
    CustomNode = DefaultNode,
    CustomField = DefaultField,
    className,
    onFieldOutMouseDown,
    onFieldInMouseUp,
    ...rest
  } = props;

  const nodeType = get(schema, `nodeTypes.${type}`, {});
  const typeName = nodeType.name;

  const nodeFields = get(nodeType, `fields`, [])
    .map((field: ISchemaField) => {
      const dataType = get(schema, `dataTypes.${field.dataType}`, {});
      const fieldName = field.name || dataType.name;
      return (
        <CustomField
          color={dataType.color}
          key={field.id}
          input={field.input}
          output={field.output}
          height={FIELD_HEIGHT}
          onMouseDown={() => onFieldOutMouseDown(id, field.id)}
          onMouseUp={() => onFieldInMouseUp(id, field.id)}
        >
          {!field.controlType ? fieldName : <DefaultControl name={fieldName} />}
        </CustomField>
      );
    });

  return (
    <CustomNode
      {...rest}
      id={id}
      width={NODE_WIDTH}
      className={"node " + className}
    >
      <NodeTitle>
        {name || typeName}
        {name && <NodeSubtitle>{typeName}</NodeSubtitle>}
      </NodeTitle>
      <div>
        {nodeFields}
      </div>
    </CustomNode>
  );
}

export default Node;
