import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Tweet from './Tweet';
import TweetLike from './TweetLike';
import TweetComment from './TweetComment';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(type => Tweet, tweet => tweet.owner)
  tweets: Tweet[];

  @OneToMany(type => TweetLike, like => like.owner)
  likes: TweetLike[];

  @OneToMany(type => TweetComment, comment => comment.owner)
  comments: TweetComment[];
}

export default User;
