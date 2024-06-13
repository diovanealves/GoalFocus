import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class CreateGoalDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  currentValue?: number

  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  finalValue: number
}
