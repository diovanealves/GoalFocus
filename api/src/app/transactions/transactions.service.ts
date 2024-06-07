import { PrismaService } from '@/lib/prisma.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { GoalsService } from '../goals/goals.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly goalsService: GoalsService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const goalData = await this.goalsService.findOne(
      createTransactionDto.goalId,
    )

    if (goalData.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      )
    }

    await this.prisma.transaction.create({
      data: {
        value: createTransactionDto.value,
        type: createTransactionDto.type,
        goalId: createTransactionDto.goalId,
      },
    })
  }
}