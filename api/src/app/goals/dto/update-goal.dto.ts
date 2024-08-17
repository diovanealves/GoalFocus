import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsDecimal, IsNumberString, IsOptional } from 'class-validator'
import { CreateGoalDto } from './create-goal.dto'

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @IsOptional()
  @ApiProperty({ description: "The goal's title" })
  title: string

  @IsOptional()
  @ApiProperty({ description: "The goal's description" })
  description: string

  @IsOptional()
  @IsNumberString({ locale: 'en-US' })
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  finalValue: string
}
