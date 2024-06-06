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

  async update(goalId: string, updateGoalDto: UpdateGoalDto) {
    await this.findOne(goalId)

    await this.prisma.goal.update({
      where: { id: goalId },
      data: { ...updateGoalDto },
    })
  }
}
