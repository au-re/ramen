import React from "react";

import { EditorContext } from "../../context/EditorProvider/EditorProvider";
import { GraphContext } from "../../context/GraphProvider/GraphProvider";
import { IGraphConnection, INoodleLayerProps } from "../../types";
import Noodle from "./components/Noodle/Noodle";
import Noodles from "./components/Noodles/Noodles";

function NoodleLayer(props: INoodleLayerProps) {
  const { onConnectionMouseDown, height, width } = props;
  const {
    graph,
    getConnectionEnd,
    getConnectionStart,
  } = React.useContext(GraphContext);

  const {
    mousePos,
    dragOrigin,
  } = React.useContext(EditorContext);

  const { connections } = graph;

  return (
    <Noodles height={height} width={width}>
      {
        connections.map((connection: IGraphConnection, idx: number) => {
          const connectionStart = getConnectionStart(connection);
          const connectionEnd = getConnectionEnd(connection);
          return (
            <Noodle
              key={idx}
              start={connectionStart}
              end={connectionEnd}
              onMouseDown={() => onConnectionMouseDown(idx)}
            />
          );
        })
      }
      {
        dragOrigin && (
          <Noodle
            start={getConnectionStart(dragOrigin)}
            end={mousePos}
          />
        )
      }
    </Noodles>
  );
}

export default NoodleLayer;
