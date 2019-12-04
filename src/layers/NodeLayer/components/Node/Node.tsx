import get from "lodash.get";
import React from "react";

import { FIELD_HEIGHT, NODE_WIDTH } from "../../../../constants";
import { INodeProps, ISchemaField, ISchemaFieldInput } from "../../../../types";
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

  const outFields = get(schema, `nodeTypes.${type}.fields.out`, [])
    .map((field: ISchemaField, idx: number) => (
      <CustomField
        color={get(schema, `fieldTypes.${field.fieldType}.color`)}
        key={idx}
        hasOutput={true}
        height={FIELD_HEIGHT}
        onMouseDown={() => onFieldOutMouseDown(id, field.id)}
      >
        {get(schema, `fieldTypes.${field.fieldType}.name`)}
      </CustomField>
    ));

  const inFields = get(schema, `nodeTypes.${type}.fields.in`, [])
    .map((field: ISchemaFieldInput, idx: number) => (
      <CustomField
        color={get(schema, `fieldTypes.${field.fieldType}.color`)}
        key={idx}
        hasInput={true}
        height={FIELD_HEIGHT}
        onMouseUp={() => onFieldInMouseUp(id, field.id)}
      >
        {get(schema, `fieldTypes.${field.fieldType}.name`)}
      </CustomField>
    ));

  const typeName = get(schema, `nodeTypes.${type}.name`, "");

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
        {outFields}
        {inFields}
      </div>
    </CustomNode>
  );
}

export default Node;
