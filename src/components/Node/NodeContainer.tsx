import get from "lodash.get";
import React from "react";

import { RamenContext } from "../../context/RamenContext/RamenContext";
import DefaultField from "../Field/Field";
import DefaultNode from "./Node";

const PIN_SPACING = 42;

function NodeContainer(props: any) {
  const { node, Node = DefaultNode, Field = DefaultField, ...rest } = props;
  const { onFieldOutMouseDown, onFieldInMouseUp } = props;

  const { schema } = React.useContext(RamenContext);

  const outFields = get(schema, `nodeTypes.${node.type}.fields.out`, [])
    .map((field: any, idx: number) => (
      <Field
        color={get(schema, `socketTypes.${field.type}.color`)}
        key={idx}
        hasOutput={true}
        height={PIN_SPACING}
        onMouseDown={() => onFieldOutMouseDown(node.id, field.id)}
      >
        {field.name}
      </Field>
    ));

  const inFields = get(schema, `nodeTypes.${node.type}.fields.in`, [])
    .map((field: any, idx: number) => (
      <Field
        color={get(schema, `socketTypes.${field.type}.color`)}
        key={idx}
        hasInput={true}
        height={PIN_SPACING}
        onMouseUp={() => onFieldInMouseUp(node.id, field.id)}
      >
        {field.name}
      </Field>
    ));

  return (
    <Node {...rest} name={node.name || get(schema, `nodeTypes.${node.type}.name`, "")}>
      {outFields}
      {inFields}
    </Node>
  );
}

export default NodeContainer;
