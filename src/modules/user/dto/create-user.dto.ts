import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'O nome completo do usuário', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Nome de usuário (username)', example: 'johndoe' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'O email do usuário', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'strongpassword123' })
  @IsString()
  password: string;
}
