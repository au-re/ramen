import * as React from "react";
import styled from "styled-components";
import { RamenContext } from "../../context/RamenContext/RamenContext";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ZoomPanContainer: any = styled.div`
  transform-origin: 0px 0px 0px;
  transform: translate(${(props: any) => props.xPos}px, ${(props: any) => props.yPos}px) scale(${(props: any) => props.scale});
`;

function isInBoundary(val: number, min: number, max: number) {
  return val >= min && val <= max;
}

function normalizeScroll(delta: number) {
  const direction = delta > 0 ? -1 : 1;
  return direction;
}
// TODO: fetch minX, minY from component height, width
function ZoomPan(props: any) {
  const { children, zoomSpeed = 4, onScaleChange = () => { }, onPosChange = () => { } } = props;
  const { maxX = 0, minX = -4116, maxY = 0, minY = -4116, minZoom = 0.5, maxZoom = 1.7 } = props;
  const { zoom: canZoom = true, pan: canPan = true } = props;

  const { graph, setZoomLevel } = React.useContext(RamenContext);

  const wrapper = React.useRef(null);
  const [xPos, setXPos] = React.useState(0);
  const [yPos, setYPos] = React.useState(0);
  const [dragStartPos, setDragStartPos]: [any, any] = React.useState(null);

  React.useEffect(() => {
    if (!wrapper || !wrapper.current) return;

    const zoomArea = wrapper.current;

    // zoom into the container
    function zoom(zoomChange: number, ox = 0, oy = 0) {
      if (!canZoom) return;
      const d = (graph.zoom - zoomChange) / ((graph.zoom - zoomChange) || 1);

      if (isInBoundary(zoomChange, minZoom, maxZoom)) {

        const newXPos = (xPos + ox) * d;
        const newYPos = (yPos + oy) * d;
        const minXBoundary = (minX * zoomChange + window.innerHeight);
        const minYBoundary = (minY * zoomChange + window.innerWidth);

        if (newXPos >= maxX) setXPos(maxX);
        else if (newXPos <= minXBoundary) setXPos(minXBoundary);
        else setXPos(newXPos);

        if (newYPos >= maxY) setYPos(maxY);
        else if (newYPos <= minYBoundary) setYPos(minYBoundary);
        else setYPos(newYPos);

        setZoomLevel(zoomChange || 1);
        onScaleChange(zoomChange);
        onPosChange({ x: xPos * -1, y: yPos * -1 });
      }
    }

    // pan through the container
    function translate(x: number, y: number) {
      if (!canPan) return;
      const minXBoundary = (minX * graph.zoom + window.innerWidth);
      const minYBoundary = (minY * graph.zoom + window.innerHeight);

      if (x >= maxX) setXPos(maxX);
      else if (x <= minXBoundary) setXPos(minXBoundary);
      else setXPos(x);

      if (y >= maxY) setYPos(maxY);
      else if (y <= minYBoundary) setYPos(minYBoundary);
      else setYPos(y);

      onPosChange({ x: xPos * -1, y: yPos * -1 });
    }

    // zoom on wheel scroll events
    function onWheelScroll(e: WheelEvent) {
      e.preventDefault();

      const scrollSpeed = normalizeScroll(e.deltaY);
      const rect = zoomArea.getBoundingClientRect();
      const delta = (scrollSpeed ? scrollSpeed / 120 : scrollSpeed / 3) * zoomSpeed;
      const ox = (rect.left - e.clientX) * delta;
      const oy = (rect.top - e.clientY) * delta;

      zoom(graph.zoom * (1 + delta), ox, oy);
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

      translate(delta[0] / zoom, delta[1] / zoom);
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
      minX,
      minY,
      onScaleChange,
      onPosChange]);

  return (
    <Wrapper ref={wrapper}>
      <ZoomPanContainer xPos={xPos} yPos={yPos} scale={graph.zoom}>
        {children}
      </ZoomPanContainer>
    </Wrapper>
  );
}

export default ZoomPan;
