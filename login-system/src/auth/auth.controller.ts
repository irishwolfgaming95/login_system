import {
  Body,
  Controller,
  ForbiddenException,
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
  ): Promise<UserModel> {
    session.user = session.user ? session.user : loginData.username;
    console.log(loginData);

    console.log(session.user);

    const sessionUser = await session.user;

    const user = await this.prismaService.user.findFirst({
      where: { username: loginData.username },
    });

    const match = await bcrypt.compare(loginData.password, user.hashedPassword);

    console.log(match);
    if (match) {
      delete user.hashedPassword;

      return sessionUser;

      
    }
    throw new ForbiddenException('login failed');
  }

  @Post('register')
  async User(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
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
