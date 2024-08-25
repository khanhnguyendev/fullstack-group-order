import { IsString, IsNotEmpty } from 'class-validator';

export class SignInWithGuestDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
