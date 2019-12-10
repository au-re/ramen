import * as React from "react";

import { EDITOR_ID } from "../../constants";
import { EditorContext } from "../../context/EditorProvider/EditorProvider";
import { IZoomPanWrapperProps } from "../../types";
import { Wrapper, ZoomPanContainer } from "./ZoomPanWrapper.styles";

function normalizeScroll(delta: number) {
  const direction = delta > 0 ? -1 : 1;
  return direction;
}

function isInBoundary(val: number, min: number, max: number) {
  return val >= min && val <= max;
}

/** provides zooming and panning
 * @param props
 */
function ZoomPanWrapper(props: IZoomPanWrapperProps) {
  const { children, zoomSpeed = 4, minZoom = 0.5, maxZoom = 1.7 } = props;
  const { maxX = 0, maxY = 0, padding = 20 } = props;
  const { canZoom = true, canPan = true } = props;

  const [dragStartPos, setDragStartPos] = React.useState(null);

  const {
    zoom,
    xPos,
    yPos,
    setZoomLevel,
    setPosition,
  } = React.useContext(EditorContext);

  const wrapper = React.useRef(null);

  React.useEffect(() => {
    if (!wrapper || !wrapper.current) return;

    const zoomArea = wrapper.current;
    const rect = zoomArea.getBoundingClientRect();

    const el = document.getElementById(EDITOR_ID);
    const minX = -el.offsetHeight - padding;
    const minY = -el.offsetWidth - padding;

    /** zoom functionality
     * @param zoomChange
     * @param ox
     * @param oy
     */
    function changeZoom(zoomChange: number, ox = 0, oy = 0) {
      const d = (zoom - zoomChange) / ((zoom - zoomChange) || 1);

      if (isInBoundary(zoomChange, minZoom, maxZoom)) {

        let newXPos = (xPos + ox) * d;
        let newYPos = (yPos + oy) * d;
        const minXBoundary = -Math.abs(minX * zoomChange + window.innerHeight);
        const minYBoundary = -Math.abs(minY * zoomChange + window.innerWidth);

        if (newXPos >= maxX) newXPos = maxX;
        else if (newXPos <= minXBoundary) newXPos = minXBoundary;

        if (newYPos >= maxY) newYPos = maxY;
        else if (newYPos <= minYBoundary) newYPos = minYBoundary;

        setZoomLevel(zoomChange, newXPos, newYPos);
      }
    }

    /** pan functionality
     * @param newXPos
     * @param newYPos
     */
    function changePosition(newXPos: number, newYPos: number) {
      if (!canPan) return;
      const minXBoundary = -Math.abs(minX * zoom + window.innerWidth);
      const minYBoundary = -Math.abs(minY * zoom + window.innerHeight);

      if (newXPos >= maxX) newXPos = maxX;
      else if (newXPos <= minXBoundary) newXPos = minXBoundary;

      if (newYPos >= maxY) newYPos = maxY;
      else if (newYPos <= minYBoundary) newYPos = minYBoundary;

      setPosition(newXPos, newYPos);
    }

    // event listeners

    // zoom on scroll
    function onWheelScroll(e: WheelEvent) {
      if (!canZoom) return;
      e.preventDefault();

      const scrollSpeed = normalizeScroll(e.deltaY);
      const delta = (scrollSpeed ? scrollSpeed / 120 : scrollSpeed / 3) * zoomSpeed;

      const zoomChange = zoom * (1 + delta);
      const xPosChange = (rect.left - e.clientX) * delta;
      const yPosChange = (rect.top - e.clientY) * delta;

      changeZoom(zoomChange, xPosChange, yPosChange);
    }

    // start pan on middle mouse button down
    function onPointerDown(e: MouseEvent) {
      e.stopPropagation();

      if (e.button !== 1) return;

      setDragStartPos([e.pageX - xPos, e.pageY - yPos]);
    }

    // pan on middle mouse button down and move
    function onPointerMove(e: MouseEvent) {
      e.preventDefault();

      if (!dragStartPos) return;

      const rect = zoomArea.getBoundingClientRect();
      const delta = [e.pageX - dragStartPos[0], e.pageY - dragStartPos[1]];
      const zoom = rect.width / zoomArea.offsetWidth;

      changePosition(delta[0] / zoom, delta[1] / zoom);
    }

    // end pan on middle mouse button up
    function onPointerUp(e: MouseEvent) {
      if (!dragStartPos) return;
      if (e.button !== 1) return;

      setDragStartPos(null);
    }

    zoomArea.addEventListener("wheel", onWheelScroll);
    zoomArea.addEventListener("pointerdown", onPointerDown);
    zoomArea.addEventListener("pointerup", onPointerUp);
    zoomArea.addEventListener("pointermove", onPointerMove);

    return () => {
      zoomArea.removeEventListener("wheel", onWheelScroll);
      zoomArea.removeEventListener("pointerdown", onPointerDown);
      zoomArea.removeEventListener("pointerup", onPointerUp);
      zoomArea.removeEventListener("pointermove", onPointerMove);
    };

  }, [
      zoomSpeed,
      xPos,
      yPos,
      dragStartPos,
      minZoom,
      maxZoom,
      maxX,
      maxY,
    ]);

  return (
    <Wrapper ref={wrapper}>
      <ZoomPanContainer xPos={xPos} yPos={yPos} scale={zoom}>
        {children}
      </ZoomPanContainer>
    </Wrapper>
  );
}

export default ZoomPanWrapper;
