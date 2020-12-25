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

  @Put('update/:id')
  async update(@Param('id') id): Promise<UserModel> {
    return this.userService.updateUser({
      data: { username: String(), password: String() },
      where: { id: Number(id) },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { username: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
