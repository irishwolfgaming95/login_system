import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from 'src/items/dto/create-user.dto';
import { User as UserModel } from '@prisma/generated';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return 'get all users';
  }

  @Delete(':id')
  delete(@Param('id') id): string {
    return `Delete ${id}`;
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateUserDto, @Param('id') id): string {
    return `Update ${id}-Username: ${updateItemDto.username}`;
  }

  @Post('user')
  async signupUser(
    @Body() userData: { username: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
