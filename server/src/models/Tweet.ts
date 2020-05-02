import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from './User';
import TweetLike from './TweetLike';
import TweetComment from './TweetComment';

@Entity('tweets')
class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  content: String;

  @Column('timestamp with time zone')
  createdAt: Date;

  @ManyToOne(type => User, user => user.tweets)
  owner: User;

  @OneToMany(type => TweetLike, like => like.tweet)
  likes: TweetLike[];

  @OneToMany(type => TweetComment, comment => comment.tweet)
  comments: TweetComment[];
}

export default Tweet;
