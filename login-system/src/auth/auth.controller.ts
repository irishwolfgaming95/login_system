import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Prisma, User } from '@prisma/generated';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() loginData: LoginDto,
    @Session() session: Record<string, any>,
  ): Promise<any> {
    console.log(loginData);
    const user = await this.prismaService.user.findFirst({
      where: { username: loginData.username },
    });
    const match = await bcrypt.compare(loginData.password, user.hashedPassword);
    console.log(match);
    if (match) {
      delete user.hashedPassword;
      session.username = user.username
      return user;
    }
    throw new ForbiddenException('login failed');
  }

  @Get('logout')
  async logout(@Session() session: Record<string, any>): Promise<boolean> {
    delete session.username;
    return true
  }

  @Post('register')
  async register(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    console.log(userData);
    const hashedPassword = await bcrypt.hash(
      userData.hashedPassword,
      saltOrRounds,
    );
    console.log(hashedPassword);

    const response = await this.userService.createUser({
      ...userData,
      hashedPassword: hashedPassword,
    });
    delete userData.hashedPassword;

    return response;
  }
}

export interface LoginDto {
  username: string;
  password: string;
}
