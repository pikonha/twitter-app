import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_comment')
class TweetComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tweetId: User;

  @Column()
  ownerId: User;

  @Column()
  content: String;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Tweet, tweet => tweet.comments)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;

  @ManyToOne(type => User, user => user.comments)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}

export default TweetComment;
