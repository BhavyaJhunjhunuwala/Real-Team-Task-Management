import { IsEmail, IsString, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsIn(['Admin', 'Member'])
  role!: 'Admin' | 'Member';
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}