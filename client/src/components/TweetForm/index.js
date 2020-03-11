import React from "react";

import { Container } from "./styled";

export default function TweetForm() {
  return (
    <Container>
      <textarea placeholder="O que você está pensando" rows={3} />
      <div>
        <button>Enviar</button>
      </div>
    </Container>
  );
}
