import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsPositive } from 'class-validator'

export class CreateGoalDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  finalValue: number
}
