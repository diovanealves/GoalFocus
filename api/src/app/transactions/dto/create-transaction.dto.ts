import { ApiProperty } from '@nestjs/swagger'
import { TransactionType } from '@prisma/client'
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
} from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumberString({ locale: 'en-US' })
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty()
  value: string

  @IsNotEmpty()
  @IsEnum(TransactionType, {
    message: 'The type of transaction must be either "Income" or "Expense"',
  })
  @ApiProperty()
  type: TransactionType

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  goalId: string
}
