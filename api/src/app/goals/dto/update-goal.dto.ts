import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CreateGoalDto } from './create-goal.dto'

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @IsOptional()
  @ApiProperty({ description: "The goal's title" })
  title: string

  @IsOptional()
  @ApiProperty({ description: "The goal's description" })
  description: string

  @IsOptional()
  @ApiProperty({ description: "The goal's current value" })
  currentValue: number

  @IsOptional()
  @ApiProperty({ description: "The goal's final value" })
  finalValue: number
}
