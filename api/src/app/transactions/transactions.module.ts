import { PrismaService } from '@/lib/prisma.service'
import { Module } from '@nestjs/common'
import { GoalsService } from '../goals/goals.service'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, GoalsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
