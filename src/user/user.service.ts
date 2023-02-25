import { Injectable } from '@nestjs/common';

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

  getById(userId: number) {
    return this.users[userId - 1];
  }

  create(user: User) {
    this.users.push(user);
    return user;
  }

  update(userId: number, user: User) {
    return this.getById(userId) ? (this.users[userId - 1] = user) : false;
  }

  delete(userId: number) {
    return !!this.users.splice(userId - 1, 1).length;
  }
}
