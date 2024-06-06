import { PrismaService } from '@/lib/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateGoalDto } from './dto/create-goal.dto'

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

  async findByUser(userId: string) {
    return await this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }
}
