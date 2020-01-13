import { IStoreState } from "../types";

/** returns an array with all nodes
 */
export function getNodes(state: IStoreState) {
  return Object.values(state.history.present.nodes) || [];
}

/** returns a node given a node id
 * @param nodeId
 */
export function getNode(state: IStoreState, nodeId: string) {
  return state.history.present.nodes[nodeId];
}
