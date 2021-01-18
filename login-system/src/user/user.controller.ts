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
  async findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session;
  }

  async findAllUsers(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Put('user/:id')
  async update(
    @Param('id') id,
    @Body() updateData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: {
        ...updateData,
        username: updateData.username,
        hashedPassword: updateData.hashedPassword,
      },
    });
  }

  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
