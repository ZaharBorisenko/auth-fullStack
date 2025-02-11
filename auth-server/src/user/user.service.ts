import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthMethod } from 'prisma/__generated__';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден! Проверьте введённые данные',
      );
    }

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async create(
    email: string,
    password: string,
    userName: string,
    userAvatar: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        userName,
        userAvatar,
        method,
        isVerified,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        userName: dto.name,
        isTwoFactorEnable: dto.isTwoFactorEnabled,
      },
    });

    return updatedUser;
  }
}
