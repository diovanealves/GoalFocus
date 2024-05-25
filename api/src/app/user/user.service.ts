import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/lib/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ password, ...rest }: CreateUserDto) {
    const hashedPassword = hashSync(password, 10);
    await this.prisma.user
      .create({
        data: { ...rest, password: hashedPassword },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException('Email already exists');
          }
        }
      });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  async findByEmail(options?: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUniqueOrThrow({ ...options });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
