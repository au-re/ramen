import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideContextMenu, showContextMenu } from "../../../redux/contextMenu/contextMenu.actions";
import { getContextMenu } from "../../../redux/contextMenu/contextMenu.selectors";

function isMenu(target: any) {
  const el = document.getElementById("CONTEXT_MENU");
  if (target.id === "CONTEXT_MENU" || el.contains(target)) {
    return true;
  }
  return false;
}

function useContextMenu(viewport: any): null {
  const dispatch = useDispatch();
  const { visible } = useSelector(getContextMenu);

  React.useEffect(() => {
    if (!viewport) return;

    function preventDefaultContextMenu(e: MouseEvent) {
      e.preventDefault();
      dispatch(showContextMenu({ x: e.pageX - viewport.offsetLeft, y: e.pageY - viewport.offsetTop }, "default"));
    }

    function removeContextMenu(e: MouseEvent) {
      if (visible && !isMenu(e.target)) {
        dispatch(hideContextMenu());
      }
    }

    viewport.addEventListener("click", removeContextMenu);
    viewport.addEventListener("contextmenu", preventDefaultContextMenu);

    return () => {
      viewport.removeEventListener("click", removeContextMenu);
      viewport.removeEventListener("contextmenu", preventDefaultContextMenu);
    };

  }, [viewport, visible]);

  return null;
}

export default useContextMenu;
