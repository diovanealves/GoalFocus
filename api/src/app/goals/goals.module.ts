import { PrismaService } from '@/lib/prisma.service'
import { Module } from '@nestjs/common'
import { GoalsController } from './goals.controller'
import { GoalsService } from './goals.service'

@Module({
  controllers: [GoalsController],
  providers: [GoalsService, PrismaService],
  exports: [GoalsService],
})
export class GoalsModule {}
