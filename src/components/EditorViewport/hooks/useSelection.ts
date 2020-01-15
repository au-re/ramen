import Selection from "@simonwep/selection-js";
import get from "lodash.get";
import * as React from "react";
import { useDispatch } from "react-redux";

import { NODE_CLASSNAME, NOODLE_CLASSNAME } from "../../../constants";
import { setSelection } from "../../../redux/selection/selection.actions";

function isValidSelectionStart(evt: any) {
  const selectionClassName = get(evt, "selected[0].classList");
  if (
    selectionClassName &&
    (selectionClassName.contains(NODE_CLASSNAME) ||
      selectionClassName.contains(NOODLE_CLASSNAME))) {
    return false;
  }
  return true;
}

function useSelection(viewport: any): null {
  const dispatch = useDispatch();
  const [isSelecting, setSelecting] = React.useState(false);

  // reset selection when clicking the viewport (when not selecting anything)
  React.useEffect(() => {
    if (!viewport) return;

    function resetSelection(e: MouseEvent) {
      if (!isSelecting && (e.target as HTMLInputElement).tagName === "svg") dispatch(setSelection([]));
    }

    viewport.addEventListener("pointerdown", resetSelection);
    return () => {
      viewport.removeEventListener("pointerdown", resetSelection);
    };
  }, [viewport, isSelecting]);

  // create a new selection object bound to our local viewport
  React.useEffect(() => {
    if (!viewport) return;

    const selection = new Selection({
      selectables: [`.${NODE_CLASSNAME}`, `.${NOODLE_CLASSNAME}`],
      startareas: [`#${viewport.id}`],
      singleClick: false,
    });

    function startSelection(evt: any) {
      if (isValidSelectionStart(evt)) {
        setSelecting(true);
      } else {
        selection.cancel();
      }
    }

    function stopSelection(evt: any) {
      setSelecting(false);
      dispatch(setSelection(evt.selected.map((selected: any) => `${selected.id}`)));
    }

    selection
      .on("start", startSelection)
      .on("stop", stopSelection);

    return () => {
      selection.destroy();
    };

  }, [viewport]);

  return null;
}

export default useSelection;
