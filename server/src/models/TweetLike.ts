import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_likes')
class TweetLike {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  tweetId: User;

  @ManyToOne(type => Tweet, tweet => tweet.likes)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;

  @Column()
  ownerId: User;

  @ManyToOne(type => User, user => user.likes)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column('timestamp with time zone')
  createdAt: Date;
}

export default TweetLike;
