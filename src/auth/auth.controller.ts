import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(@Body() { email, password }: LoginDTO) {
    const user = await this.userService.getByEmail(email);

    if (!user || user.password !== password || user.email !== email)
      return 'You have entered an invalid email or password';

    return user;
  }
}
