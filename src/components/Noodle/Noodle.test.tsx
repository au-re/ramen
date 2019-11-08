import React from "react";
import renderer from "react-test-renderer";

import Noodle from "./Noodle";

describe("Noodle", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<Noodle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
