import { IsNotEmpty, IsString, IsEmail, IsBoolean, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
