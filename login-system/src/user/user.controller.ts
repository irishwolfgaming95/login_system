import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Session,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/generated';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/generated';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(
    @Session() session: Record<string, any>,
  ): Promise<UserModel[]> {
    return session.cookie;
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(
    @Param('id') id,
    @Session() session: Record<string, any>,
  ): Promise<UserModel> {
    return session.cookie;
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Put('user/:id')
  async update(
    @Param('id') id,
    @Body() updateData: Prisma.UserUpdateInput,
    @Session() session: Record<string, any>,
  ): Promise<UserModel> {
    const update = await this.userService.updateUser({
      where: { id: Number(id) },
      data: {
        ...updateData,
        username: updateData.username,
        hashedPassword: updateData.hashedPassword,
      },
    });
    return session.cookie;
  }

  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
    @Session() session: Record<string, any>,
  ): Promise<UserModel> {
    return session.cookie;
    return this.userService.createUser(userData);
  }
}
