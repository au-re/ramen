import get from "lodash.get";
import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { FIELD_HEIGHT, NODE_CLASSNAME, NODE_WIDTH, DEFAULT_CONTROL_TYPE } from "../../../../constants";
import { isFieldInputConnected } from "../../../../redux/connections/connections.selectors";
import { getControlType, getDataType, getNodeType, getControlProps } from "../../../../redux/schema/schema.selectors";
import { ISchemaField } from "../../../../redux/schema/schema.types";
import { setSelection } from "../../../../redux/selection/selection.actions";
import { IStoreState } from "../../../../redux/types";
import DefaultControl from "../DefaultControl/DefaultControl";
import DefaultField from "../DefaultField/DefaultField";
import { NodeSubtitle, NodeTitle, NodeWrapper, ControlWrapper } from "./DefaultNode.styles";

function getFieldControl(controls: any, controlType: any, dataTypeControlType: any) {
  const FieldControl = controls[controlType || dataTypeControlType || ""];
  if (FieldControl) {
    return FieldControl;
  }

  if (controlType === DEFAULT_CONTROL_TYPE || dataTypeControlType === DEFAULT_CONTROL_TYPE) {
    return DefaultControl;
  }
  return null;
}


function NodeField(props: any) {
  const { fieldId, nodeId, name, dataType, controlType, controlProps, fieldProps = {} } = props;
  const { hideControlOnInput, hasInput, hasOutput, controls = {} } = props;

  const fieldDataTypeDetails = useSelector((state: IStoreState) =>
    getDataType(state, dataType), shallowEqual);
  const dataTypeControlProps = useSelector((state: IStoreState) =>
    getControlProps(state, dataType), shallowEqual);
  const hasInputConnection = useSelector(
    (state: IStoreState) => isFieldInputConnected(state, nodeId, fieldId),
    shallowEqual);

  const FieldControl = getFieldControl(controls, controlType, fieldDataTypeDetails.controlType);

  const fieldName = name || fieldDataTypeDetails.name;
  const customControlProps = { ...fieldProps, ...(controlProps || dataTypeControlProps || {}) };

  const hideControl = hideControlOnInput && hasInputConnection || !FieldControl;

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
      {hideControl ? fieldName :
        <ControlWrapper className="noDrag">
          <FieldControl name={fieldName} {...customControlProps} />
        </ControlWrapper>
      }
    </DefaultField>
  );
}

const MemoizedNodeField = React.memo(NodeField, (prevProps, nextProps) => {
  return prevProps.fieldId === nextProps.fieldId
    && prevProps.name === nextProps.name
    && prevProps.dataType === nextProps.dataType
    && prevProps.controlType === nextProps.controlType
    && prevProps.controlProps === nextProps.controlProps
    && prevProps.isInput === nextProps.isInput
    && prevProps.isOutput === nextProps.isOutput
    && prevProps.hideControlOnInput === nextProps.hideControlOnInput;
});

function DefaultNode(props: any) {
  const {
    nodeId,
    className,
    style,
    type,
    onMouseUpFieldIn,
    selected = false,
    name,
    controls,
    nodeState = {},
    ...rest
  } = props;

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
        controlProps={field.controlProps}
        fieldProps={nodeState[field.id]}
        controls={controls}
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
