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
export class UserController {}
