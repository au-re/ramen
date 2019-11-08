import React from "react";
import renderer from "react-test-renderer";

import Node from "./Node";

describe("Node", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<Node />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
