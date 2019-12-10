import * as React from "react";
import { IEditorContext, IEditorProvider, ILocation } from "../../types";

const defaultState = {
  zoom: 1,
  xPos: 0,
  yPos: 0,
};

export const EditorContext = React.createContext({} as IEditorContext);

function EditorProvider(props: IEditorProvider) {
  const { children, initialEditorState = defaultState, onEditorStateChange = () => { } } = props;

  const [zoom, setZoom] = React.useState(initialEditorState.zoom);
  const [xPos, setXPos] = React.useState(initialEditorState.xPos);
  const [yPos, setYPos] = React.useState(initialEditorState.yPos);
  const [mousePos, setMousePos] = React.useState({} as ILocation);
  const [dragOrigin, setDragOrigin] = React.useState(null);

  function setZoomLevel(newZoomLevel: number, newXPos: number, newYPos: number) {
    setZoom(newZoomLevel);
    setXPos(newXPos);
    setYPos(newYPos);
    onEditorStateChange({ zoom: newZoomLevel, xPos: newXPos, yPos: newYPos });
  }

  function setPosition(newXPos: number, newYPos: number) {
    setXPos(newXPos);
    setYPos(newYPos);
    onEditorStateChange({ zoom, xPos: newXPos, yPos: newYPos });
  }

  const boundingBox = React.useRef(null);
  const isDragging = !!dragOrigin;

  React.useEffect(() => {
    const boundingBoxRect = boundingBox.current ? boundingBox.current.getBoundingClientRect() : {};
    const xOffset = boundingBoxRect.x;
    const yOffset = boundingBoxRect.y;

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newMousePos = {
          x: ((e.x - xOffset - xPos) / zoom),
          y: ((e.y - yOffset - yPos) / zoom),
        };

        setMousePos(newMousePos);
      }
    };

    const onMouseUp = () => {
      if (isDragging) {
        setDragOrigin(null);
        setMousePos(null);
      }
    };

    window.addEventListener("mousedown", onMouseMove);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [zoom, boundingBox, isDragging]);

  const contextValue: IEditorContext = {
    zoom,
    xPos,
    yPos,
    mousePos,
    dragOrigin,
    setZoomLevel,
    setPosition,
    setDragOrigin,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <div id="ramen-drag-container" style={{ height: "100%", width: "100%" }} ref={boundingBox}>
        {children}
      </div>
    </EditorContext.Provider>
  );
}

export default EditorProvider;
