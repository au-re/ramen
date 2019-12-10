import * as React from "react";

import { EditorContext } from "../context/EditorProvider/EditorProvider";
import { GraphContext } from "../context/GraphProvider/GraphProvider";

function useRamenActions() {

  const {
    graph,
    updateNodeLocation,
    createConnection,
    deleteConnection,
  } = React.useContext(GraphContext);

  const {
    dragOrigin,
    setDragOrigin,
  } = React.useContext(EditorContext);

  const { connections } = graph;

  /** start a connection given the origin field and node id
   * @param originNodeId
   * @param originFieldId
   */
  function startConnection(originNodeId: string, originFieldId: string, originDataType: string) {
    setDragOrigin({ originNode: originNodeId, originField: originFieldId, originDataType });
  }

  /** complete a connection given the target field and node id
   * @param targetNodeId
   * @param targetFieldId
   */
  function makeConnection(targetNodeId: string, targetFieldId: string) {
    if (!dragOrigin) return;

    createConnection({
      originNode: dragOrigin.originNode,
      originField: dragOrigin.originField,
      targetNode: targetNodeId,
      targetField: targetFieldId,
    });

    setDragOrigin(null);
  }

  /** delete a connection with connectionId
   * @param connectionId
   */
  function removeConnection(connectionId: number) {
    const connectionStart = connections.find((_: any, _idx: number) => (_idx === connectionId));
    setDragOrigin(connectionStart);
    deleteConnection(connectionId);
  }

  return {
    startConnection,
    makeConnection,
    removeConnection,
    updateNodeLocation,
  };
}

export default useRamenActions;
