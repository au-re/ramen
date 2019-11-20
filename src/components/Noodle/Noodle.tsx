import React from "react";
import styled from "styled-components";

const NoodlePath = styled.path`
  stroke: ${({ theme }) => theme.noodleColor};
`;

interface IVector {
  x: number;
  y: number;
}

function distance(start: IVector, end: IVector) {
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

function Noodle(props: any) {
  const { start, end, onMouseDown = () => { } } = props;

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
        d={pathString}
        fill="none"
        strokeWidth="4"
      />
      <path
        onMouseDown={onMouseDown}
        d={pathString}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{ cursor: "grab" }}
      />
    </g>
  );
}

export default Noodle;
