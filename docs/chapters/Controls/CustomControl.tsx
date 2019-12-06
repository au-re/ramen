import "semantic-ui-css/semantic.min.css";

import noop from "lodash.noop";
import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { Button, Popup } from "semantic-ui-react";
import color from "tinycolor2";

interface IColorPickerProps {
  value?: string;
  onChange: (hex: string) => void;
  colors?: string[];
}

class ColorPicker extends Component<IColorPickerProps, {}>  {

  state = {
    background: this.props.value,
  };

  static defaultProps = {
    value: "#f2f2f2",
    size: "medium",
    onChange: noop,
  };

  handleChangeComplete = (color: any) => {
    const { onChange } = this.props;
    this.setState({ background: color.hex });
    onChange(color.hex);
  }

  getTextColor = (backgroundColor?: string) => {
    if (color(backgroundColor).isLight()) {
      return "rgba(0,0,0,.8)";
    }
    return "#fff";
  }

  render() {
    return (
      <Popup
        style={{ padding: 0, overflow: "hidden", background: "transparent", borderRadius: "6px" }}
        position="bottom center"
        on="click"
        basic={true}
        trigger={
          (
            <span style={{ display: "inline-block" }}>
              <Button
                type="button"
                style={{
                  background: this.state.background,
                  color: this.getTextColor(this.state.background),
                }}
              >
                {this.state.background}
              </Button>
            </span>
          )
        }
      >
        <SketchPicker
          disableAlpha={true}
          presetColors={this.props.colors}
          color={this.state.background}
          onChangeComplete={this.handleChangeComplete}
        />
      </Popup>

    );
  }
}

export default ColorPicker;
