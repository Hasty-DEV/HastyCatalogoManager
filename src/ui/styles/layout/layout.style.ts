import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "nav content"
    "nav footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
`;
