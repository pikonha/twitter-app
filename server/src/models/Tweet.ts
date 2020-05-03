import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';
import TweetLike from './TweetLike';
import TweetComment from './TweetComment';

@Entity('tweets')
class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  ownerId: string;

  @ManyToOne(type => User, user => user.tweets)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(type => TweetLike, like => like.tweet)
  likes: TweetLike[];

  @OneToMany(type => TweetComment, comment => comment.tweet)
  comments: TweetComment[];
}

export default Tweet;
