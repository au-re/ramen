import * as React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

function useKeyEvents(viewport: any): null {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!viewport) return;

    // make sure the viewport can be focused
    function setFocus() {
      viewport.focus();
    }

    // handle ctrl + z, ctrl + y
    function onKeyDown(e: KeyboardEvent) {

      if (e.ctrlKey && e.keyCode === 90) {
        dispatch(ActionCreators.undo());
      }

      if (e.ctrlKey && e.keyCode === 89) {
        dispatch(ActionCreators.redo());
      }
    }

    viewport.addEventListener("click", setFocus);
    viewport.addEventListener("keydown", onKeyDown);

    return () => {
      viewport.removeEventListener("click", setFocus);
      viewport.removeEventListener("keydown", onKeyDown);
    };

  }, [viewport]);

  return null;
}

export default useKeyEvents;
