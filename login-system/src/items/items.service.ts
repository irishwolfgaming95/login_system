import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateInput, User } from '@prisma/generated';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
