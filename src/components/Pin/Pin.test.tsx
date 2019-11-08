import React from "react";
import renderer from "react-test-renderer";

import Pin from "./Pin";

describe("Pin", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<Pin />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
