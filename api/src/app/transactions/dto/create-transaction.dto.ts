import { TransactionType } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsPositive, IsUUID } from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  value: number

  @IsNotEmpty()
  @IsEnum(TransactionType, {
    message: 'The type of transaction must be either "Income" or "Expense"',
  })
  type: TransactionType

  @IsNotEmpty()
  @IsUUID()
  goalId: string
}
