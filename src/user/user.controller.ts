import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

interface User {
  firstName: string;
  lastName: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

@Controller('/user')
export class UserController {
  users = [
    { firstName: 'Manu', lastName: 'Kem' },
    { firstName: 'Mar', lastName: 'San' },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get('/:userId')
  getUser(@Param() params: { userId: number }) {
    return this.users[params.userId - 1];
  }

  @Post()
  store(@Req() { body: user }: CustomRequest<User>) {
    this.users.push(user);
    return user;
  }

  @Patch('/:userId')
  updateUser(
    @Param() params: { userId: number },
    @Req() { body: user }: CustomRequest<User>,
  ) {
    const { userId } = params;

    return this.getUser({ userId }) ? (this.users[userId - 1] = user) : false;
  }

  @Delete('/:userId')
  deleteUser(@Param() params: { userId: number }) {
    return !!this.users.splice(params.userId - 1, 1).length;
  }
}
