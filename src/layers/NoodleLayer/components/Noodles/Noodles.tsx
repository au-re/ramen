import styled from "styled-components";

import { NOODLE_LAYER } from "../../../../constants";

const Noodles = styled.svg.attrs({ id: NOODLE_LAYER })`
  position: absolute;
  z-index: 90;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  top: 0;
  left: 0;
`;

export default Noodles;
