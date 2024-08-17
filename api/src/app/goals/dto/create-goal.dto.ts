import { ApiProperty } from '@nestjs/swagger'
import { IsDecimal, IsNotEmpty, IsNumberString } from 'class-validator'

export class CreateGoalDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsNotEmpty()
  @IsNumberString({ locale: 'en-US' })
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  finalValue: string
}
