import { Repository, EntityRepository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
