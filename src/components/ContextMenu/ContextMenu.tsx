import React from "react";
import { useSelector } from "react-redux";

import { getContextMenu } from "../../redux/contextMenu/contextMenu.selectors";
import { ContextMenuBackground } from "./ContextMenu.styles";

function ContextMenu() {
  const { visible, pos, type } = useSelector(getContextMenu);
  if (!visible || !pos) return null;
  return (
    <ContextMenuBackground id="CONTEXT_MENU" posX={pos.x} posY={pos.y}>
      <div>menu 1</div>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
      </ul>
    </ContextMenuBackground>
  );
}

export default ContextMenu;
