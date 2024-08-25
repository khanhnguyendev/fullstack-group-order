import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignInWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
