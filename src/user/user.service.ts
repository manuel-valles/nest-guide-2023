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

  get() {
    return this.userRepository.find();
  }

  getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  create(user: CreateUserDTO) {
    return this.userRepository.save(user);
  }

  update(id: number, user: UpdateUserDTO) {
    return this.userRepository.update(id, user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
