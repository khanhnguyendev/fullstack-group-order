import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpWithGuestDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;
}
