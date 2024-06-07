import { PrismaService } from '@/lib/prisma.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ password, ...rest }: CreateUserDto) {
    const hashedPassword = hashSync(password, 10)
    await this.prisma.user
      .create({
        data: { ...rest, password: hashedPassword },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException('Email already exists')
          }
        }
      })
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    })
  }

  async findByEmail(options: Prisma.UserFindUniqueArgs) {
    const user = await this.prisma.user.findUnique({ ...options })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.findByEmail({ where: { id: userId } })

    if (updateUserDto.password) {
      updateUserDto.password = hashSync(updateUserDto.password, 8)
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { ...updateUserDto },
    })
  }

  async remove(userId: string) {
    await this.findByEmail({ where: { id: userId } })

    await this.prisma.transaction.deleteMany({
      where: { goal: { userId } },
    })

    await this.prisma.goal.deleteMany({
      where: { userId },
    })

    await this.prisma.user.delete({
      where: { id: userId },
    })
  }
}
