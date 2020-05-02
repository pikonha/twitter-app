import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Tweet from './Tweet';
import TweetLike from './TweetLike';
import TweetComment from './TweetComment';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: String;

  @Column()
  username: String;

  @Column()
  password: String;

  @Column('timestamp with time zone')
  createdAt: Date;

  @OneToMany(type => Tweet, tweet => tweet.owner)
  tweets: Tweet[];

  @OneToMany(type => TweetLike, like => like.owner)
  likes: TweetLike[];

  @OneToMany(type => TweetComment, comment => comment.owner)
  comments: TweetComment[];
}

export default User;
