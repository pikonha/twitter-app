import React, { useState } from "react";

import { Container } from "./styles";

export default function TweetForm(props) {
  const [text, setText] = useState("");

  const handleTweet = async event => {
    event.preventDefault();
    await props.onCreateTweet(text);
    setText("");
  };

  return (
    <Container>
      <textarea
        required
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="O que você está pensando?"
        rows={4}
      />
      <div>
        <button onClick={handleTweet}>Enviar</button>
      </div>
    </Container>
  );
}
