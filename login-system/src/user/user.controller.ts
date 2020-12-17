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

@Controller('user')
export class UserController {
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
}
