import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpWithGuestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
