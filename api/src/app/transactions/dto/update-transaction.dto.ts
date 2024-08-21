import { OmitType, PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { IsDecimal, IsNumberString, IsOptional } from 'class-validator'
import { CreateTransactionDto } from './create-transaction.dto'

export class UpdateTransactionDto extends PartialType(
  OmitType(CreateTransactionDto, ['goalId']),
) {
  @IsOptional()
  @ApiProperty({ description: "The transaction's type" })
  type: $Enums.TransactionType

  @IsOptional()
  @IsNumberString({ locale: 'en-US' })
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty({ description: "The transaction's value" })
  value: string
}
