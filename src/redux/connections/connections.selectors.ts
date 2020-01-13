import get from "lodash.get";

import { FIELD_HEIGHT, NODE_HEADER_HEIGHT, NODE_WIDTH } from "../../constants";
import { getNode } from "../nodes/nodes.selectors";
import { getFieldSchema, getNodeSchema } from "../schema/schema.selectors";
import { IStoreState } from "../types";
import { IGraphConnection, IGraphConnectionOrigin, IGraphConnectionTarget } from "./connections.types";

/** returns the connection map as an array
 * @param state
 */
export function getConnections(state: IStoreState) {
  return Object.values(state.history.present.connections) || [];
}

/** returns true if the field as an input that is connected
 * @param fieldId
 */
export function isFieldInputConnected(state: IStoreState, nodeId: string, fieldId: string): boolean {
  return Object.values(state.history.present.connections).some((connection: IGraphConnection) => (
    connection.targetField === fieldId && connection.targetNode === nodeId
  ));
}

/** given a connection return the start of it in x, y coordinates
 * @param connection
 */
export function getConnectionStart(state: IStoreState, connection: IGraphConnectionOrigin) {
  if (!connection) return null;

  const node = getNode(state, connection.originNode);
  const nodeSchema = getNodeSchema(state, connection.originNode);
  const fieldIdx = get(nodeSchema, "fields", [])
    .findIndex((pin: any) => pin.id === connection.originField);

  if (!node || !nodeSchema || fieldIdx === -1) return null;

  const y = node.y + (fieldIdx * FIELD_HEIGHT) + NODE_HEADER_HEIGHT + (FIELD_HEIGHT / 2);
  const x = node.x + (nodeSchema.width || NODE_WIDTH);
  return { x, y };
}

/** given a connection return the end of it in x, y coordinates
 * @param connection
 */
export function getConnectionEnd(state: IStoreState, connection: IGraphConnectionTarget) {
  if (!connection) return null;

  const node = getNode(state, connection.targetNode);
  const nodeSchema = get(state, `schema.nodeTypes[${get(node, "type")}]`);
  const fieldIdx = get(nodeSchema, "fields", [])
    .findIndex((pin: any) => pin.id === connection.targetField);

  if (!node || !nodeSchema || fieldIdx === -1) return null;

  const y = node.y + (fieldIdx * FIELD_HEIGHT) + NODE_HEADER_HEIGHT + (FIELD_HEIGHT / 2);
  const x = node.x;
  return { x, y };
}

/** returns true if the schema allows for such a connection
 * @param state
 * @param connection
 */
export function isValidConnection(state: IStoreState, connection: IGraphConnection) {
  const { originNode, originField, targetNode, targetField } = connection;
  const originDataType = getFieldSchema(state, originNode, originField).dataType;
  const targetDataType = getFieldSchema(state, targetNode, targetField).dataType;
  return get(state, `schema.dataTypes[${originDataType}].validTargets`, []).includes(targetDataType);
}
