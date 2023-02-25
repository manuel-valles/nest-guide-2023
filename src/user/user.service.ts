import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

export interface User {
  firstName: string;
  lastName: string;
}

@Injectable()
export class UserService {
  private users = [
    { firstName: 'Manu', lastName: 'Kem' },
    { firstName: 'Mar', lastName: 'San' },
  ];

  get() {
    return this.users;
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
