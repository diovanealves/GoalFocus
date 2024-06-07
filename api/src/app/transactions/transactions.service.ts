import { PrismaService } from '@/lib/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { GoalsService } from '../goals/goals.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly goalsService: GoalsService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.goalsService.findOne(createTransactionDto.goalId, userId)

    await this.prisma.transaction.create({
      data: {
        value: createTransactionDto.value,
        type: createTransactionDto.type,
        goalId: createTransactionDto.goalId,
      },
    })
  }

  async findOne(transactionsId: string, userId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionsId, goal: { userId } },
    })

    if (!transaction) {
      throw new NotFoundException(
        'Transaction not found or you are not the owner of this transaction',
      )
    }

    return transaction
  }

  async findLastTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        goal: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.findOne(transactionId, userId)

    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: { ...updateTransactionDto },
    })
  }

  async delete(userId: string, transactionId: string) {
    await this.findOne(transactionId, userId)

    await this.prisma.transaction.delete({
      where: { id: transactionId },
    })
  }
}
