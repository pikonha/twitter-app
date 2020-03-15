import React from "react";

import Routes from "./Routes";
import { Container, Content } from "./styled";

function App() {
  return (
    <Container className="App">
      <Content>
        <Routes />
      </Content>
    </Container>
  );
}

export default App;
