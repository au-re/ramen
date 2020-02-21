import get from "lodash.get";
import * as React from "react";
import { useDispatch } from "react-redux";

import { setSelection } from "../../../redux/selection/selection.actions";

function useSelection(viewport: any): null {
  const dispatch = useDispatch();

  // reset selection when clicking the viewport (when not selecting anything)
  React.useEffect(() => {
    if (!viewport) return;

    function resetSelection(e: MouseEvent) {
      if ((e.target as HTMLInputElement).tagName === "svg") dispatch(setSelection([]));
    }

    viewport.addEventListener("pointerdown", resetSelection);
    return () => {
      viewport.removeEventListener("pointerdown", resetSelection);
    };
  }, [viewport]);

  return null;
}

export default useSelection;
