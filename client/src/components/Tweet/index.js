import React, { useState, useEffect } from "react";

import { Container, LikeButton } from "./styles";

export default function Tweet(props) {
  return (
    <Container>
      <span>{props.username}</span>

      <p>{props.content}</p>

      <div>
        <span>{props.likes}</span>
        <LikeButton onClick={() => props.onLike(props.owner, props.tweetId)}>
          Like
        </LikeButton>
      </div>
    </Container>
  );
}
