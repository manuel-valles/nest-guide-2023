import { IsString, IsEmail } from 'class-validator';
export class UpdateUserDTO {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
}
