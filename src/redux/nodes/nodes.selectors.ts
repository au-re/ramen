import { IStoreState } from "../types";
import { IGraphConnection } from "../connections/connections.types";

/** returns an array with all nodes
 */
export function getNodes(state: IStoreState) {
  return Object.values(state.nodes) || [];
}

/** returns a node given a node id
 * @param nodeId
 */
export function getNode(state: IStoreState, nodeId: string) {
  return state.nodes[nodeId];
}
