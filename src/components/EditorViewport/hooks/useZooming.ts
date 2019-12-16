import * as React from "react";
import { useDispatch } from "react-redux";
import { setViewportZoom } from "../../../redux/viewport/viewport.actions";

function useZooming(canZoom: boolean, viewport: any): null {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!viewport || !canZoom) return;

    // zoom on scroll
    function onWheelScroll(e: WheelEvent) {
      e.preventDefault();
      dispatch(setViewportZoom(e.deltaY, e.clientX, e.clientY));
    }

    viewport.addEventListener("wheel", onWheelScroll);

    return () => {
      viewport.removeEventListener("wheel", onWheelScroll);
    };

  }, [canZoom, viewport]);

  return null;
}

export default useZooming;
