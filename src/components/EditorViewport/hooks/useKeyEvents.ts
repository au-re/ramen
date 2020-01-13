import * as React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

function useKeyEvents(viewport: any): null {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!viewport) return;

    // handle ctrl + z, ctrl + y
    function onKeyDown(e: KeyboardEvent) {

      if (e.ctrlKey && e.keyCode === 90) {
        dispatch(ActionCreators.undo());
      }

      if (e.ctrlKey && e.keyCode === 89) {
        dispatch(ActionCreators.redo());
      }
    }

    viewport.addEventListener("keydown", onKeyDown);

    return () => {
      viewport.removeEventListener("keydown", onKeyDown);
    };

  }, [viewport]);

  return null;
}

export default useKeyEvents;
