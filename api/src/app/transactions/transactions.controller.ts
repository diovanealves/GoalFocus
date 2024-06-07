import { JwtGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser, UserPayload } from '@/lib/current-user-decorator'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionsService } from './transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  create(
    @CurrentUser() user: UserPayload,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(user.sub, createTransactionDto)
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  findLastTransactions(@CurrentUser() user: UserPayload) {
    return this.transactionsService.findLastTransactions(user.sub)
  }

  @Patch('/:transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  update(
    @CurrentUser() user: UserPayload,
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      user.sub,
      transactionId,
      updateTransactionDto,
    )
  }
}
