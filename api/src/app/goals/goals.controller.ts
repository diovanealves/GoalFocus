import { JwtGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser, UserPayload } from '@/lib/current-user-decorator'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateGoalDto } from './dto/create-goal.dto'
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
}
