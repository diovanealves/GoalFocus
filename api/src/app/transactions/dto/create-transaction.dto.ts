import { ApiProperty } from '@nestjs/swagger'
import { TransactionType } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsPositive, IsUUID } from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  value: number

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
