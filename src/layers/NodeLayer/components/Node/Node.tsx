import get from "lodash.get";
import React from "react";

import { FIELD_HEIGHT, NODE_WIDTH } from "../../../../constants";
import { GraphContext } from "../../../../context/GraphProvider/GraphProvider";
import { INodeProps } from "../../../../types";
import DefaultField from "../Field/Field";
import { NodeTitle, NodeWrapper as DefaultNode } from "./Node.styles";

function Node(props: INodeProps) {
  const {
    node,
    CustomNode = DefaultNode,
    CustomField = DefaultField,
    className,
    onFieldOutMouseDown,
    onFieldInMouseUp,
    ...rest
  } = props;

  const { schema } = React.useContext(GraphContext);

  const outFields = get(schema, `nodeTypes.${node.type}.fields.out`, [])
    .map((field: any, idx: number) => (
      <CustomField
        color={get(schema, `socketTypes.${field.type}.color`)}
        key={idx}
        hasOutput={true}
        height={FIELD_HEIGHT}
        onMouseDown={() => onFieldOutMouseDown(node.id, field.id)}
      >
        {field.name}
      </CustomField>
    ));

  const inFields = get(schema, `nodeTypes.${node.type}.fields.in`, [])
    .map((field: any, idx: number) => (
      <CustomField
        color={get(schema, `socketTypes.${field.type}.color`)}
        key={idx}
        hasInput={true}
        height={FIELD_HEIGHT}
        onMouseUp={() => onFieldInMouseUp(node.id, field.id)}
      >
        {field.name}
      </CustomField>
    ));

  return (
    <CustomNode
      {...rest}
      id={node.id}
      width={NODE_WIDTH}
      className={"node " + className}
    >
      <NodeTitle>
        {node.name}
      </NodeTitle>
      <div>
        {outFields}
        {inFields}
      </div>
    </CustomNode>
  );
}

export default Node;
