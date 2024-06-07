import { JwtGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser, UserPayload } from '@/lib/current-user-decorator'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { GoalsService } from './goals.service'

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  create(
    @CurrentUser() user: UserPayload,
    @Body() createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.create(user.sub, createGoalDto)
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  findByUser(@CurrentUser() user: UserPayload) {
    return this.goalsService.findByUser(user.sub)
  }

  @Get('/:goalId/transactions')
  @UseGuards(JwtGuard)
  findTransactionsByGoal(
    @CurrentUser() user: UserPayload,
    @Param('goalId') goalId: string,
  ) {
    return this.goalsService.findTransactionsByGoal(user.sub, goalId)
  }

  @Patch(':goalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  update(
    @CurrentUser() user: UserPayload,
    @Param('goalId') goalId: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.update(user.sub, goalId, updateGoalDto)
  }

  @Delete(':goalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  remove(@CurrentUser() user: UserPayload, @Param('goalId') goalId: string) {
    return this.goalsService.remove(user.sub, goalId)
  }
}
