import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class CreateGoalDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  currentValue?: number

  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  finalValue: number
}
