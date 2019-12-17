import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { types } from "../../constants";
import { createConnection, deleteConnection } from "../../redux/connections/connections.actions";
import { setPendingConnectionEndPos, setPendingConnectionOrigin } from "../../redux/editor/editor.actions";
import { getPendingConnection } from "../../redux/editor/editor.selectors";
import { IStoreState } from "../../redux/types";

function EditorEvents(): null {

  const dispatch = useDispatch();

  const pendingConnectionOrigin = useSelector(getPendingConnection);
  const editorId = useSelector((state: IStoreState) => state.references.editorId);

  React.useEffect(() => {
    const editor = document.getElementById(editorId);

    function onPointerDownField(targetData: any) {
      const fieldId = targetData.fieldid;
      const isInput = targetData.isinput;
      const nodeId = targetData.nodeid;

      if (fieldId && isInput !== "true") {
        dispatch(setPendingConnectionOrigin({ originField: fieldId, originNode: nodeId }));
      }
    }

    function onPointerDownNoodle(targetData: any) {
      const connectionId = targetData.connectionid;

      if (connectionId) {
        dispatch(deleteConnection(connectionId));
      }
    }

    function onPointerDown(e: MouseEvent) {
      const target = e.target as HTMLInputElement;
      const type = target.dataset.type;

      if (type) {
        e.stopPropagation();
        e.preventDefault();
      }

      if (type === types.FIELD) {
        onPointerDownField(target.dataset);
      }
    }

    function onPointerUp(e: MouseEvent) {
      const target = e.target as HTMLInputElement;
      const fieldId = target.dataset.fieldid;
      const isInput = target.dataset.isinput;
      const nodeId = target.dataset.nodeid;

      if ((!fieldId || isInput !== "true") && pendingConnectionOrigin) {
        e.stopPropagation();
        e.preventDefault();
        dispatch(setPendingConnectionOrigin(null));
      }

      if (fieldId && isInput === "true" && pendingConnectionOrigin) {
        e.stopPropagation();
        e.preventDefault();
        dispatch(createConnection({ ...pendingConnectionOrigin, targetField: fieldId, targetNode: nodeId }));
        dispatch(setPendingConnectionOrigin(null));
      }
    }

    function onPointerMove(e: MouseEvent) {
      if (pendingConnectionOrigin) {
        e.stopPropagation();
        e.preventDefault();
        dispatch(setPendingConnectionEndPos({ x: e.x, y: e.y }));
      }
    }

    editor.addEventListener("pointerdown", onPointerDown);
    editor.addEventListener("pointerup", onPointerUp);
    editor.addEventListener("pointermove", onPointerMove);

    return () => {
      editor.removeEventListener("pointerdown", onPointerDown);
      editor.removeEventListener("pointerup", onPointerUp);
      editor.removeEventListener("pointermove", onPointerMove);
    };
  }, [pendingConnectionOrigin]);

  return null;
}

export default EditorEvents;
