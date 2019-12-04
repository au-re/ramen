import * as React from "react";

import useRamenActions from "../../hooks/useRamenActions";
import BackgroundLayer from "../../layers/BackgroundLayer/BackgroundLayer";
import BoxSelectionLayer from "../../layers/BoxSelectionLayer/BoxSelectionLayer";
import ContextMenuLayer from "../../layers/ContextMenuLayer/ContextMenuLayer";
import NodeLayer from "../../layers/NodeLayer/NodeLayer";
import NoodleLayer from "../../layers/NoodleLayer/NoodleLayer";
import { IDefaultEditorProps } from "../../types";
import ZoomPanWrapper from "../ZoomPanWrapper/ZoomPanWrapper";

function DefaultEditor(props: IDefaultEditorProps) {
  const { height, width, canZoom = true, canPan = true } = props;

  const {
    startConnection,
    makeConnection,
    removeConnection,
    updateNodeLocation,
  } = useRamenActions();

  return (
    <ZoomPanWrapper canZoom={canZoom} canPan={canPan}>
      <BoxSelectionLayer />
      <ContextMenuLayer />
      <NodeLayer
        onNodeDrop={updateNodeLocation}
        onNodeDrag={updateNodeLocation}
        onFieldInMouseUp={makeConnection}
        onFieldOutMouseDown={startConnection}
      />
      <NoodleLayer onConnectionMouseDown={removeConnection} />
      <BackgroundLayer height={height} width={width} />
    </ZoomPanWrapper>
  );
}

export default DefaultEditor;
