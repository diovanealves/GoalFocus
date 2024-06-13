import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

import { JwtGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser, UserPayload } from '@/lib/current-user-decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('acceess-token')
  findByEmail(@CurrentUser() user: UserPayload) {
    return this.userService.findByEmail({
      where: { email: user.email },
      select: { id: true, name: true, email: true },
    })
  }

  @Patch('')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('acceess-token')
  update(
    @CurrentUser() user: UserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.sub, updateUserDto)
  }

  @Delete('')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('acceess-token')
  remove(@CurrentUser() user: UserPayload) {
    return this.userService.remove(user.sub)
  }
}
