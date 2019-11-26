import React from "react";

import { DragContext } from "../../../context/DragContext/DragContext";
import { RamenContext } from "../../../context/RamenContext/RamenContext";
import { IGraphConnection } from "../../../types";
import Noodle from "../../Noodle/Noodle";
import Noodles from "../../Noodles/Noodles";

function NoodleLayer(props: any) {
  const { onConnectionMouseDown } = props;
  const {
    graph,
    getConnectionEnd,
    getConnectionStart,
  } = React.useContext(RamenContext);

  const {
    mousePos,
    dragStart,
  } = React.useContext(DragContext);

  const { connections } = graph;

  return (
    <Noodles>
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
        dragStart && (
          <Noodle
            start={getConnectionStart(dragStart)}
            end={mousePos}
          />
        )
      }
    </Noodles>
  );
}

export default NoodleLayer;
