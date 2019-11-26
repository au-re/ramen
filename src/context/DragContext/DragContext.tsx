import * as React from "react";

import Background from "../../components/Background/Background";
import { RamenContext } from "../RamenContext/RamenContext";

export const DragContext = React.createContext({} as any);

/**
 * Provides the state of the drag behavior to the editor.
 * Provides helper functions to handle drag events on nodes, noodles.
 *
 * @param {*} props
 */
function DragProvider(props: any) {
  const { graph } = React.useContext(RamenContext);
  const [dragStart, setDragStart] = React.useState(null);
  const [mousePos, setMousePos] = React.useState({});

  const { zoom } = graph;

  // add an offset based on the main div offset from 0 0
  const boundingBox = React.useRef(null);
  const isDragging = !!dragStart;

  React.useEffect(() => {
    const boundingBoxRect = boundingBox.current ? boundingBox.current.getBoundingClientRect() : {};
    const xOffset = boundingBoxRect.x;
    const yOffset = boundingBoxRect.y;

    const onMouseMove = (e: MouseEvent) => {
      const newMousePos = {
        x: ((e.x / zoom) - (xOffset / zoom)) + scrollX,
        y: ((e.y / zoom) - (yOffset / zoom)) + scrollY,
      };
      if (isDragging) setMousePos(newMousePos);
    };

    const onMouseUp = () => {
      if (isDragging) setDragStart(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [zoom, boundingBox, isDragging]);

  const contextValue = {
    dragStart,
    mousePos,
    setDragStart,
    setMousePos,
  };

  return (
    <DragContext.Provider value={contextValue}>
      <div id="DragContainer" style={{ height: "100%", width: "100%" }} ref={boundingBox}>
        {props.children}
      </div>
    </DragContext.Provider>
  );
}

export default DragProvider;
