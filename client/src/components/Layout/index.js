import React from "react";

import { Container, Content } from "./styles";

export default function Layout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
