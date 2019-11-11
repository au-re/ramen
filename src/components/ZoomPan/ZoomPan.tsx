import * as React from "react";
import styled from "styled-components";

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

function ZoomPan(props: any) {
  const { children, zoomSpeed = 1.8, onScaleChange = () => { }, onPosChange = () => { } } = props;
  const { maxX = 0, minX = -4116, maxY = 0, minY = -4116, minZoom = 0.5, maxZoom = 1.7 } = props;
  const wrapper = React.useRef(null);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [xPos, setXPos] = React.useState(0);
  const [yPos, setYPos] = React.useState(0);
  const [dragStartPos, setDragStartPos]: [any, any] = React.useState(null);

  React.useEffect(() => {
    if (!wrapper || !wrapper.current) return;

    const zoomArea = wrapper.current;

    // zoom into the container
    function zoom(zoom: number, ox = 0, oy = 0) {
      const d = (zoomLevel - zoom) / ((zoomLevel - zoom) || 1);

      if (isInBoundary(zoom, minZoom, maxZoom)) {

        const newXPos = (xPos + ox) * d;
        const newYPos = (yPos + oy) * d;
        const minXBoundary = (minX * zoom + window.innerWidth);
        const minYBoundary = (minY * zoom + window.innerHeight);

        if (newXPos >= maxX) setXPos(maxX);
        else if (newXPos <= minXBoundary) setXPos(minXBoundary);
        else setXPos(newXPos);

        if (newYPos >= maxY) setYPos(maxY);
        else if (newYPos <= minYBoundary) setYPos(minYBoundary);
        else setYPos(newYPos);

        setZoomLevel(zoom || 1);
        onScaleChange(zoom);
        onPosChange({ x: xPos * -1, y: yPos * -1 });
      }
    }

    // pan through the container
    function translate(x: number, y: number) {
      const minXBoundary = (minX * zoomLevel + window.innerWidth);
      const minYBoundary = (minY * zoomLevel + window.innerHeight);

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

      const rect = zoomArea.getBoundingClientRect();
      const delta = (-e.deltaY ? -e.deltaY / 120 : -e.deltaY / 3) * zoomSpeed;
      const ox = (rect.left - e.clientX) * delta;
      const oy = (rect.top - e.clientY) * delta;

      zoom(zoomLevel * (1 + delta), ox, oy);
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
      zoomLevel,
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
      <ZoomPanContainer xPos={xPos} yPos={yPos} scale={zoomLevel}>
        {children}
      </ZoomPanContainer>
    </Wrapper>
  );
}

export default ZoomPan;
