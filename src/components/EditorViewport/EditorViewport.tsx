import React, { useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { VIEWPORT_ID } from "../../constants";
import { IStoreState } from "../../redux/types";
import { EditorWrapperBackground, Viewport } from "./EditorViewport.styles";
import usePanning from "./hooks/usePanning";
import useZooming from "./hooks/useZooming";

function EditorWrapper(props: any) {
  const { xPos, yPos, zoom } = useSelector((state: IStoreState) => (state.viewport), shallowEqual);
  return (
    <EditorWrapperBackground xPos={xPos} yPos={yPos} scale={zoom}>
      {props.children}
    </EditorWrapperBackground>
  );
}

/** provides zooming and panning functionality
 * @param props
 */
function EditorViewport(props: any) {
  const { children } = props;
  const { canPan = true, canZoom = true } = props;

  const viewportRef = useRef(null);
  const [viewport, setViewport] = React.useState(null);

  React.useEffect(() => {
    if (viewportRef.current && !viewport) {
      setViewport(viewportRef.current);
    }
  }, [viewportRef]);

  // zoom functionality
  useZooming(canZoom, viewport);

  // pan functionality
  usePanning(canPan, viewport);

  return (
    <Viewport id={VIEWPORT_ID} ref={viewportRef}>
      <EditorWrapper>
        {children}
      </EditorWrapper>
    </Viewport>
  );
}

export default React.memo(EditorViewport, (prevProps, nextProps) => {
  return prevProps.canPan === nextProps.canPan
    && prevProps.canZoom === nextProps.canZoom;
});
