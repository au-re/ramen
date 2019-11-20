import styled from "styled-components";

const Background: any = styled.div`
  height: ${(props: any) => props.height}px;
  width: ${(props: any) => props.width}px;
  position: relative;
  background-image: radial-gradient(${({ theme }) => (theme.editorBackgroundMuted || "#96A1A9")}, transparent 5%);
  background-color: ${({ theme }) => (theme.editorBackground || "#fff")};
  background-size: 1.5rem 1.5rem;
`;

export default Background;
