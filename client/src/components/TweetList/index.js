import React from "react";

import { Container } from "./styles";
import Tweet from "../Tweet";

export default function TweetList(props) {
  return (
    <Container>
      <ul>
        {props.tweets.reverse().map(tweet => (
          <Tweet
            key={tweet._id}
            tweetId={tweet._id}
            owner={tweet.owner}
            username={tweet.username}
            content={tweet.content}
            likes={tweet.likes.length}
            onLike={props.onLike}
          />
        ))}
      </ul>
    </Container>
  );
}
