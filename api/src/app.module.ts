import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './app/users/user.module'
import { AuthModule } from './auth/auth.module'
import { GoalsModule } from './app/goals/goals.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, GoalsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
