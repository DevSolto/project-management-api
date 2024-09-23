import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name:string

  @IsString()
  userName:string

  @IsEmail()
  email:string

  @IsString()
  password:string
}
