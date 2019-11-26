import * as React from "react";

import { DragContext } from "../../context/DragContext/DragContext";
import { RamenContext } from "../../context/RamenContext/RamenContext";
import { IEditorProps } from "../../types";
import Background from "../Background/Background";
import NodeLayer from "../Layers/NodeLayer/NodeLayer";
import NoodleLayer from "../Layers/NoodleLayer/NoodleLayer";

function Editor(props: IEditorProps) {
  const {
    graph,
    updateNodeLocation,
    createConnection,
    deleteConnection,
  } = React.useContext(RamenContext);

  const {
    dragStart,
    setDragStart = () => { },
  } = React.useContext(DragContext);

  const { connections } = graph;

  /** start a connection given the origin pin and node id
   * @param nodeId
   * @param pinId
   */
  function startConnection(nodeId: string, pinId: string) {
    setDragStart({ originNode: nodeId, originPin: pinId });
  }

  /** complete a connection given the target pin and node id
   * @param nodeId
   * @param pinId
   */
  function completeConnection(nodeId: string, pinId: string) {
    if (!dragStart) return;

    const connection = {
      originNode: dragStart.originNode,
      originPin: dragStart.originPin,
      targetNode: nodeId,
      targetPin: pinId,
    };

    createConnection(connection);
  }

  /** delete a connection with connectionId
   * @param connectionId
   */
  function cancelConnection(connectionId: number) {
    const connectionStart = connections.find((_: any, _idx: number) => (_idx === connectionId));
    setDragStart({
      originNode: connectionStart.originNode,
      originPin: connectionStart.originPin,
    });
    deleteConnection(connectionId);
  }

  return (
    <Background
      height={props.height}
      width={props.width}
    >
      {props.children}
      <NodeLayer
        onNodeDrag={updateNodeLocation}
        onNodeDrop={updateNodeLocation}
        onFieldOutMouseDown={startConnection}
        onFieldInMouseUp={completeConnection}
      />
      <NoodleLayer
        onConnectionMouseDown={cancelConnection}
      />
    </Background>
  );
}

export default Editor;
