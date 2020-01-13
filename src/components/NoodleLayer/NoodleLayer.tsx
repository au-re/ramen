import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { deleteConnection } from "../../redux/connections/connections.actions";
import { getConnectionEnd, getConnections, getConnectionStart } from "../../redux/connections/connections.selectors";
import { IGraphConnection } from "../../redux/connections/connections.types";
import { setPendingConnectionOrigin } from "../../redux/editor/editor.actions";
import { getEditor } from "../../redux/editor/editor.selectors";
import { IStoreState } from "../../redux/types";
import { makeConnectionId } from "../../redux/utils";
import Noodle from "./components/Noodle/Noodle";
import Noodles from "./components/Noodles/Noodles";

/** fetch the connection start, end from the state. Map it to the Noodle object
 * @param props
 */
function NoodleWrapper(props: any) {
  const { id, connection } = props;
  const dispatch = useDispatch();

  const connectionStart = useSelector((state: IStoreState) => getConnectionStart(state, connection));
  const connectionEnd = useSelector((state: IStoreState) => getConnectionEnd(state, connection));
  return (
    <Noodle
      id={id}
      start={connectionStart}
      end={connectionEnd}
      onPointerDown={() => {
        dispatch(deleteConnection(makeConnectionId(connection)));
        dispatch(setPendingConnectionOrigin(connection));
      }}
    />
  );
}

/** incomplete connection
 * @param props
 */
function PendingConnection(props: any) {
  const {
    pendingConnectionEndPos,
    pendingConnectionOrigin,
  } = useSelector(getEditor, shallowEqual);

  const pendingConnectionStartPos = useSelector((state: IStoreState) =>
    getConnectionStart(state, pendingConnectionOrigin), shallowEqual);

  if (!pendingConnectionOrigin) return null;

  return (
    <Noodle
      id={-1}
      start={pendingConnectionStartPos}
      end={pendingConnectionEndPos}
    />
  );
}

function NoodleLayer() {
  const connections = useSelector(getConnections, shallowEqual);

  return (
    <Noodles>
      {
        connections.map((connection: IGraphConnection, idx: number) => {
          return (
            <NoodleWrapper
              key={idx}
              id={idx}
              connection={connection}
            />
          );
        })
      }
      <PendingConnection />
    </Noodles>
  );
}

export default NoodleLayer;
