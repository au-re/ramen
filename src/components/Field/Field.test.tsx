import React from "react";
import renderer from "react-test-renderer";

import Field from "./Field";

describe("internal|Field", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(<Field />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
