import get from "lodash.get";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { FIELD_HEIGHT, NODE_WIDTH } from "../../../../constants";
import { isFieldInputConnected } from "../../../../redux/connections/connections.selectors";
import { getControlType, getDataType, getNodeType } from "../../../../redux/schema/schema.selectors";
import { ISchemaField } from "../../../../redux/schema/schema.types";
import { IStoreState } from "../../../../redux/types";
import DefaultControl from "../DefaultControl/DefaultControl";
import DefaultField from "../DefaultField/DefaultField";
import { NodeSubtitle, NodeTitle, NodeWrapper } from "./DefaultNode.styles";

function NodeField(props: any) {
  const { fieldId, nodeId, name, dataType, controlType, defaultValue } = props;
  const { hideControlOnInput, hasInput, hasOutput } = props;

  const fieldDataType = useSelector((state: IStoreState) =>
    getDataType(state, dataType), shallowEqual);
  const fieldControlType = useSelector((state: IStoreState) =>
    getControlType(state, controlType), shallowEqual);
  const fieldName = name || fieldDataType.name;
  const controlProps = { defaultValue, ...fieldControlType };

  const hasInputConnection = useSelector(
    (state: IStoreState) => isFieldInputConnected(state, nodeId, fieldId),
    shallowEqual);
  const hideControl = hideControlOnInput && hasInputConnection || !controlType;

  return (
    <DefaultField
      nodeId={nodeId}
      fieldId={fieldId}
      color={fieldDataType.color}
      key={fieldId}
      input={hasInput}
      output={hasOutput}
      height={FIELD_HEIGHT}
    >
      {hideControl ? fieldName : <DefaultControl name={fieldName} {...controlProps} />}
    </DefaultField>
  );
}

const MemoizedNodeField = React.memo(NodeField, (prevProps, nextProps) => {
  return prevProps.fieldId === nextProps.fieldId
    && prevProps.name === nextProps.name
    && prevProps.dataType === nextProps.dataType
    && prevProps.controlType === nextProps.controlType
    && prevProps.defaultValue === nextProps.defaultValue
    && prevProps.isInput === nextProps.isInput
    && prevProps.isOutput === nextProps.isOutput
    && prevProps.hideControlOnInput === nextProps.hideControlOnInput;
});

function DefaultNode(props: any) {
  const { nodeId, className, style, type, onMouseUpFieldIn, ...rest } = props;

  const nodeType = useSelector((state: IStoreState) => getNodeType(state, type));
  const typeName = nodeType.name;
  const nodeWidth = nodeType.width || NODE_WIDTH;

  const nodeFields = get(nodeType, `fields`, [])
    .map((field: ISchemaField) => (
      <MemoizedNodeField
        key={field.id}
        fieldId={field.id}
        nodeId={nodeId}
        dataType={field.dataType}
        controlType={field.controlType}
        hideControlOnInput={field.hideControlOnInput}
        name={field.name}
        hasInput={field.input}
        hasOutput={field.output}
      />
    ));

  return (
    <NodeWrapper {...rest} className={className} style={style} width={nodeWidth}>
      <NodeTitle>
        {name || typeName}
        {name && <NodeSubtitle>{typeName}</NodeSubtitle>}
      </NodeTitle>
      <div>
        {nodeFields}
      </div>
    </NodeWrapper>
  );
}

export default React.memo(DefaultNode, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name
    && prevProps.type === nextProps.type
    && prevProps.className === nextProps.className
    && prevProps.nodeId === nextProps.nodeId;
});
