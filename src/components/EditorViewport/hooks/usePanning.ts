import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { IStoreState } from "../../../redux/types";
import { setViewportPos, startPanning, stopPanning } from "../../../redux/viewport/viewport.actions";

function usePanning(canPan: boolean, viewport: any): null {
  const dispatch = useDispatch();

  const isPanning = useSelector((state: IStoreState) => (state.viewport.isPanning), shallowEqual);

  React.useEffect(() => {
    if (!viewport || !canPan) return;

    // start pan on middle mouse button down
    function onPointerDown(e: MouseEvent) {
      if (isPanning) return;
      if (e.button !== 1) return;
      e.preventDefault();
      e.stopPropagation();
      dispatch(startPanning(e.pageX, e.pageY));
    }

    // pan on middle mouse button down and move
    function onPointerMove(e: MouseEvent) {
      if (!isPanning) return;
      e.preventDefault();
      e.stopPropagation();
      dispatch(setViewportPos(e.pageX, e.pageY));
    }

    // end pan on middle mouse button up
    function onPointerUp(e: MouseEvent) {
      if (!isPanning) return;
      if (e.button !== 1) return;
      e.preventDefault();
      e.stopPropagation();
      dispatch(stopPanning());
    }

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointermove", onPointerMove);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointermove", onPointerMove);
    };

  }, [canPan, viewport, isPanning]);

  return null;
}

export default usePanning;
