import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/generated';
import { UserService } from 'src/user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('login')
  async loginUser(
    @Body() loginData: { username: string; password: string },
  ): Promise<UserModel> {
    const user = await this.prismaService.user.findFirst({
      where: { username: loginData.username },
    });

    if (user?.password === loginData.password) {
      delete user.password;
      return user;
    }
    throw new Error('failed');

    return user;
  }
}
