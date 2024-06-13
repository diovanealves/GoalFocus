import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GoalsModule } from './app/goals/goals.module'
import { TransactionsModule } from './app/transactions/transactions.module'
import { UserModule } from './app/users/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    GoalsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
