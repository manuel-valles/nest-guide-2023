import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private users = [
    { firstName: 'Manu', lastName: 'Kem', email: 'mk@mk.com' },
    { firstName: 'Mar', lastName: 'San', email: 'ms@ms.com' },
  ];

  async get() {
    return this.userRepository.find();
  }

  getById(id: number) {
    return this.users[id - 1];
  }

  create(user: CreateUserDTO) {
    this.users.push(user);
    return user;
  }

  update(id: number, user: UpdateUserDTO) {
    return this.getById(id) ? (this.users[id - 1] = user) : false;
  }

  delete(id: number) {
    return !!this.users.splice(id - 1, 1).length;
  }
}
