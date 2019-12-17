import get from "lodash.get";

import { getNode } from "../nodes/nodes.selectors";
import { IStoreState } from "../types";
import { ISchemaField } from "./schema.types";

export function getSchema(state: IStoreState) {
  return state.schema;
}

/** returns the schema of a node
 * @param nodeId
 */
export function getNodeSchema(state: IStoreState, nodeId: string) {
  const node = getNode(state, nodeId);
  return get(state, `schema.nodeTypes[${get(node, "type")}]`);
}

/** returns a node given a node id
 * @param nodeId
 */
export function getFieldSchema(state: IStoreState, nodeId: string, fieldId: string) {
  return get(getNodeSchema(state, nodeId), `fields`, [])
    .find((field: ISchemaField) => field.id === fieldId) || {};
}

export function getNodeType(state: IStoreState, nodeType: string) {
  return get(state, `schema.nodeTypes.${nodeType}`, {});
}

export function getDataType(state: IStoreState, dataType: string) {
  return get(state, `schema.dataTypes.${dataType}`, {});
}

export function getControlType(state: IStoreState, controlType: string) {
  return get(state, `schema.controlTypes.${controlType}`, {});
}
