import { PrismaService } from '@/lib/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createGoalDto: CreateGoalDto) {
    await this.prisma.goal.create({
      data: {
        title: createGoalDto.title,
        description: createGoalDto.description,
        finalValue: createGoalDto.finalValue,
        user: { connect: { id: userId } },
      },
    })
  }

  async findOne(goalId: string, userId: string) {
    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId, userId },
    })

    if (!goal) {
      throw new NotFoundException(
        'Goal not found or you are not the owner of this goal',
      )
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
    await this.findOne(goalId, userId)

    return await this.prisma.transaction.findMany({
      where: { goalId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async update(userId: string, goalId: string, updateGoalDto: UpdateGoalDto) {
    await this.findOne(goalId, userId)

    await this.prisma.goal.update({
      where: { id: goalId },
      data: {
        title: updateGoalDto.title,
        description: updateGoalDto.description,
        finalValue: updateGoalDto.finalValue,
      },
    })
  }

  async remove(userId: string, goalId: string) {
    await this.findOne(goalId, userId)

    await this.prisma.transaction.deleteMany({
      where: { goalId },
    })

    await this.prisma.goal.delete({
      where: { id: goalId },
    })
  }
}
