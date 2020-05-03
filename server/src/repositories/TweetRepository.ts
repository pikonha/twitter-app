import { EntityRepository, Repository } from 'typeorm';

import Tweet from '../models/Tweet';

@EntityRepository(Tweet)
export default class TweetRepository extends Repository<Tweet> {}
