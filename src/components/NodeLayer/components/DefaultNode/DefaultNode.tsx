import get from "lodash.get";
import * as React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { FIELD_HEIGHT, NODE_CLASSNAME, NODE_WIDTH } from "../../../../constants";
import { isFieldInputConnected } from "../../../../redux/connections/connections.selectors";
import { getControlType, getDataType, getNodeType } from "../../../../redux/schema/schema.selectors";
import { ISchemaField } from "../../../../redux/schema/schema.types";
import { IStoreState } from "../../../../redux/types";
import DefaultControl from "../DefaultControl/DefaultControl";
import DefaultField from "../DefaultField/DefaultField";
import { NodeSubtitle, NodeTitle, NodeWrapper } from "./DefaultNode.styles";
import { setSelection } from "../../../../redux/selection/selection.actions";

function NodeField(props: any) {
  const { fieldId, nodeId, name, dataType, controlType, defaultValue, Control = DefaultControl } = props;
  const { hideControlOnInput, hasInput, hasOutput } = props;

  const fieldDataTypeDetails = useSelector((state: IStoreState) =>
    getDataType(state, dataType), shallowEqual);
  const fieldControlDetails = useSelector((state: IStoreState) =>
    getControlType(state, controlType), shallowEqual);
  const fieldName = name || fieldDataTypeDetails.name;
  const controlProps = { defaultValue, ...fieldControlDetails };

  const hasInputConnection = useSelector(
    (state: IStoreState) => isFieldInputConnected(state, nodeId, fieldId),
    shallowEqual);
  const hideControl = hideControlOnInput && hasInputConnection || !controlType;

  return (
    <DefaultField
      nodeId={nodeId}
      fieldId={fieldId}
      color={fieldDataTypeDetails.color}
      key={fieldId}
      input={hasInput}
      output={hasOutput}
      height={FIELD_HEIGHT}
    >
      {hideControl ? fieldName : <Control name={fieldName} {...controlProps} />}
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
  const { nodeId, className, style, type, onMouseUpFieldIn, controls = {}, selected = false, ...rest } = props;

  const nodeType = useSelector((state: IStoreState) => getNodeType(state, type));
  const dispatch = useDispatch();
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
        Control={controls[field.controlType || ""]}
        hideControlOnInput={field.hideControlOnInput}
        name={field.name}
        hasInput={field.input}
        hasOutput={field.output}
      />
    ));

  return (
    <NodeWrapper
      {...rest}
      id={nodeId}
      className={`${NODE_CLASSNAME} ${className || ""}`}
      style={style}
      width={nodeWidth}
      selected={selected}
      onPointerDown={() => {
        if (!selected) dispatch(setSelection([nodeId]));
      }}
    >
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
    && prevProps.nodeId === nextProps.nodeId
    && prevProps.selected === nextProps.selected;
});
