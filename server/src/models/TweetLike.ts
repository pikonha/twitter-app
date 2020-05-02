import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_likes')
class TweetLike {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @ManyToOne(type => Tweet, tweet => tweet.likes)
  tweet: Tweet;

  @ManyToOne(type => User, user => user.likes)
  owner: User;

  @Column('timestamp with time zone')
  createdAt: Date;
}

export default TweetLike;
