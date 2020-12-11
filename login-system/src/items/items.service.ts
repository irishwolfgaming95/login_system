import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/generated';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
