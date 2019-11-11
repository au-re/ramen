import * as React from "react";

import Background from "../Background/Background";
import ZoomPan from "../ZoomPan/ZoomPan";

function Editor(props: any) {
  const { editorHeight, editorWidth } = props;

  return (
    <ZoomPan
      minX={-editorHeight}
      minY={-editorWidth}
      minZoom={0.5}
      maxZoom={1.7}
    >
      <Background height={editorHeight} width={editorWidth}>
        editor
      </Background>
    </ZoomPan>
  );
}

export default Editor;
