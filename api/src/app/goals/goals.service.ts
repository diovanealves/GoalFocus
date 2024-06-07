import { PrismaService } from '@/lib/prisma.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createGoalDto: CreateGoalDto) {
    await this.prisma.goal.create({
      data: {
        ...createGoalDto,
        user: { connect: { id: userId } },
      },
    })
  }

  async findOne(goalId: string) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } })

    if (!goal) {
      throw new NotFoundException('Goal not found')
    }

    return goal
  }

  async findByUser(userId: string) {
    return await this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findTransactionsByGoal(userId: string, goalId: string) {
    const goalData = await this.findOne(goalId)

    if (goalData.userId !== userId) {
      throw new UnauthorizedException(
        'You are not the owner of this goal to perform this action',
      )
    }

    return await this.prisma.transaction.findMany({
      where: { goalId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async update(userId: string, goalId: string, updateGoalDto: UpdateGoalDto) {
    await this.findOne(goalId)

    await this.prisma.goal
      .update({
        where: { id: goalId, userId },
        data: { ...updateGoalDto },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new ConflictException(
              'The provided goalID or userID is incorrect',
            )
          }
        }
      })
  }

  async remove(userId: string, goalId: string) {
    await this.findOne(goalId)

    await this.prisma.goal
      .delete({ where: { id: goalId, userId } })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new ConflictException(
              'The provided goalID or userID is incorrect',
            )
          }
        }
      })
  }
}
