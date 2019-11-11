import React from "react";
import renderer from "react-test-renderer";

import ZoomPan from "./ZoomPan";

describe("ZoomPan", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<ZoomPan />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
