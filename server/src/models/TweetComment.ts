import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_comment')
class TweetComment {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @ManyToOne(type => Tweet, tweet => tweet.comments)
  tweet: Tweet;

  @ManyToOne(type => User, user => user.comments)
  owner: User;

  @Column()
  content: String;

  @Column('timestamp with time zone')
  createdAt: Date;
}

export default TweetComment;
