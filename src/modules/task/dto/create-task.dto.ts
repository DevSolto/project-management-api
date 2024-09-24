import { IsString, IsDate, Length } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {

  @ApiProperty({ description: 'O nome da tarefa' })
  @IsString()
  @Length(5, 20)
  name: string;

  @ApiProperty({ description: 'A descrição da tarefa' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'A data de vencimento da tarefa', example: '2024-09-30T12:00:00Z' })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({ description: 'Id do usuário que está criando a task' })
  @IsString()
  creatorId: string;
}
