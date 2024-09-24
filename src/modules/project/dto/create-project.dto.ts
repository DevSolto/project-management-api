import { IsString, IsDate, IsArray, IsOptional, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nome do projeto', example: 'Platform Development' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do projeto', example: 'A project to develop a new web platform' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Data de término do projeto', example: '2024-12-31T00:00:00.000Z' })
  @IsISO8601()
  endDate: string;
}
