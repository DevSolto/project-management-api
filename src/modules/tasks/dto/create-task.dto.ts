import { IsString, IsDate, Length } from "class-validator";
import { Type } from "class-transformer";

export class CreateTaskDto {
  @IsString()
  @Length(5, 20)
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;
}
