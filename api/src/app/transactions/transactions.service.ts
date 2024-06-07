import { PrismaService } from '@/lib/prisma.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
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
    const goalData = await this.goalsService.findOne(
      createTransactionDto.goalId,
    )

    if (goalData.userId !== userId) {
      throw new UnauthorizedException(
        'You are not the owner of this goal to perform this action',
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
    const { goalId } = await this.findOne(transactionId, userId)

    await this.prisma.transaction
      .update({
        where: { id: transactionId, goalId },
        data: { ...updateTransactionDto },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new ConflictException(
              'The provided transactionId is incorrect',
            )
          }
        }
      })
  }
}
