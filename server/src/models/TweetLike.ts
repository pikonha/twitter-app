import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import Tweet from './Tweet';
import User from './User';

@Entity('tweet_likes')
class TweetLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tweetId: string;

  @Column()
  ownerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Tweet, tweet => tweet.likes)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;

  @ManyToOne(type => User, user => user.likes)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}

export default TweetLike;
