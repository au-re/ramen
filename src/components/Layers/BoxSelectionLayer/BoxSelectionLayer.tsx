import "./BoxSelectionLayer.css";

import Selection from "@simonwep/selection-js";
import React from "react";

import { SelectionContext } from "../../../context/SelectionContext/SelectionContext";

function BoxSelectionLayer(props: any): any {
  const { setSelection, setSelecting } = React.useContext(SelectionContext);

  React.useEffect(() => {
    const selection = new Selection({
      class: "selection-area",
      startareas: ["#GraphEditor", "#Noodles"],
      selectables: [".node"],
      startThreshold: 50,
    });

    selection.on("beforestart", (e: any) => {
      if (e.oe.button !== 0 || (
        e.oe.target.id !== "GraphEditor" &&
        e.oe.target.id !== "Noodles")) {
        return false;
      }
    });

    selection.on("start", (e: any) => {
      setSelecting(true);
    });

    selection.on("stop", (e: any) => {
      if (!e) return;
      setSelection(e.selected.map((i: any) => i.id));
    });
  }, []);

  return null;
}

export default BoxSelectionLayer;
