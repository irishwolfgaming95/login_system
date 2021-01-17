import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Prisma, User } from '@prisma/generated';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';

const saltOrRounds = 10;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() loginData: { username: string; password: string },
  ): Promise<UserModel> {
    const user = await this.prismaService.user.findFirst({
      where: { username: loginData.username },
    });

    const match = await bcrypt.compare(loginData.password, user.password);
    if (match) {
      return user;
    }
    throw new ForbiddenException('login failed');
  }

  @Post('register')
  async User(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
    console.log(hashedPassword, userData);

    return this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
