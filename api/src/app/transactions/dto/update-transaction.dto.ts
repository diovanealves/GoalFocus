import { OmitType, PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { CreateTransactionDto } from './create-transaction.dto'

export class UpdateTransactionDto extends PartialType(
  OmitType(CreateTransactionDto, ['goalId']),
) {
  @IsOptional()
  @ApiProperty({ description: "The transaction's type" })
  type: $Enums.TransactionType

  @IsOptional()
  @ApiProperty({ description: "The transaction's value" })
  value: number
}
