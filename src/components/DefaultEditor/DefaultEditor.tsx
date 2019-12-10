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
  const { height, width, canZoom = true, canPan = true, controls = {} } = props;

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
        controls={controls}
        onNodeDrop={updateNodeLocation}
        onNodeDrag={updateNodeLocation}
        onFieldInMouseUp={makeConnection}
        onFieldOutMouseDown={startConnection}
      />
      <NoodleLayer onConnectionMouseDown={removeConnection} height={height} width={width} />
      <BackgroundLayer height={height} width={width} />
    </ZoomPanWrapper>
  );
}

export default DefaultEditor;
