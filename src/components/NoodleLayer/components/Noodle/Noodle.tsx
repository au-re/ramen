import React from "react";
import styled from "styled-components";

import { lightTheme } from "../../../../themes";
import { IPosition } from "../../../../types";
import { INoodleProps } from "./Noodle.types";

const NoodlePath = styled.path`
  stroke: ${({ theme }) => theme.noodleColor || lightTheme.noodleColor};
`;

function distance(start: IPosition, end: IPosition) {
  return Math.sqrt(
    (end.x - start.x) * (end.x - start.x) +
    (end.y - start.y) * (end.y - start.y));
}

function bezierCurve(
  a: number,
  b: number,
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  x: number,
  y: number) {
  return `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y}  ${x},${y}`;
}

function Noodle(props: INoodleProps) {
  const { id, start, end, onPointerDown } = props;

  if (!start || !end) return null;

  const dist = distance(start, end);
  const cp1 = { x: start.x + dist * 0.15, y: start.y };
  const cp2 = { x: end.x - dist * 0.15, y: end.y };

  const pathString = bezierCurve(
    start.x,
    start.y,
    cp1.x,
    cp1.y,
    cp2.x,
    cp2.y,
    end.x,
    end.y);

  return (
    <g>
      <NoodlePath
        id={`noodle-${id}`}
        className="ramen-noodle"
        d={pathString}
        fill="none"
        strokeWidth="4"
      />
      <path
        onMouseDown={onPointerDown}
        d={pathString}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{ cursor: "grab" }}
      />
    </g>
  );
}

export default React.memo(Noodle, (prevProps, nextProps) => {
  return nextProps.start && nextProps.end
    && prevProps.start && prevProps.end
    && prevProps.start.x === nextProps.start.x
    && prevProps.start.y === nextProps.start.y
    && prevProps.end.x === nextProps.end.x
    && prevProps.end.y === nextProps.end.y;
});
