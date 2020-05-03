import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_comment')
class TweetComment {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  tweetId: User;

  @ManyToOne(type => Tweet, tweet => tweet.comments)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;

  @Column()
  ownerId: User;

  @ManyToOne(type => User, user => user.comments)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  content: String;

  @Column('timestamp with time zone')
  createdAt: Date;
}

export default TweetComment;
