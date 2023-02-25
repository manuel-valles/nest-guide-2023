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
import { User, UserService } from './user.service';
interface CustomRequest<T> extends Request {
  body: T;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.get();
  }

  @Get('/:userId')
  getUser(@Param() params: { userId: number }) {
    return this.userService.getById(params.userId);
  }

  @Post()
  createUser(@Req() { body: user }: CustomRequest<User>) {
    return this.userService.create(user);
  }

  @Patch('/:userId')
  updateUser(
    @Param() params: { userId: number },
    @Req() { body: user }: CustomRequest<User>,
  ) {
    return this.userService.update(params.userId, user);
  }

  @Delete('/:userId')
  deleteUser(@Param() params: { userId: number }) {
    return this.userService.delete(params.userId);
  }
}
