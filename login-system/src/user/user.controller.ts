import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/generated';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Put('user/:id')
  async update(
    @Param('id') id,
    @Body() updateData: { username: string; password: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: {
        ...updateData,
        username: updateData.username,
        hashedPassword: updateData.password,
      },
    });
  }

  @Post()
  async signupUser(
    @Body() userData: { username: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
