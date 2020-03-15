import React, { useState } from "react";

import { Container } from "./styled";

export default function TweetForm() {
  const [text, setText] = useState("");

  return (
    <Container>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="O que você está pensando"
        rows={4}
      />
      <div>
        <button>Enviar</button>
      </div>
    </Container>
  );
}
