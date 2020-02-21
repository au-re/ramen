import * as React from "react";
import { ThemeProvider } from "styled-components";

import Ramen from "../../../src/Ramen";
import * as customControlAdvanced from "../../schemas/customControlAdvanced";
import * as customControlPerDatatype from "../../schemas/customControlPerDatatype";

function NumberControl(props: any) {
  return (<input className="pigeon" {...props} type="number" onBlur={(e) => console.log(e.target.value)} />);
}

function ColorControl(props: any) {
  return (<input {...props} type="color" onBlur={(e) => console.log(e.target.value)} />);
}

function CustomControlsDoc() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          canZoom={false}
          canPan={false}
          height={400}
          schema={customControlAdvanced.schema}
          initialGraph={customControlAdvanced.graph}
          controls={{
            NumberControl,
            ColorControl,
          }}
        />
      </div>
      <p>define controls on a type level</p>
      <div style={{ width: "100%", height: "400px" }}>
        <Ramen
          canZoom={false}
          canPan={false}
          height={400}
          schema={customControlPerDatatype.schema}
          initialGraph={customControlPerDatatype.graph}
          controls={{
            NumberControl,
            ColorControl,
          }}
        />
      </div>
    </div>
  );
}

export default CustomControlsDoc;
