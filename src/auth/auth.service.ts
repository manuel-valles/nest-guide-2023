import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.getByEmail(email);
    const { password, ...result } = user;

    if (!user || password !== pass) return null;

    return result;
  }
}
