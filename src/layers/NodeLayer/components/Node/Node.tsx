import get from "lodash.get";
import React from "react";

import { FIELD_HEIGHT, NODE_WIDTH } from "../../../../constants";
import { INodeProps, ISchemaField } from "../../../../types";
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
      const fieldType = get(schema, `fieldTypes.${field.fieldType}`, {});
      return (
        <CustomField
          color={fieldType.color}
          key={field.id}
          hasInput={field.input}
          hasOutput={field.output}
          height={FIELD_HEIGHT}
          onMouseDown={() => onFieldOutMouseDown(id, field.id)}
          onMouseUp={() => onFieldInMouseUp(id, field.id)}
        >
          {field.name || fieldType.name}
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
