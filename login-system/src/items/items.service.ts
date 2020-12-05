import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '3233442',
      name: 'Jam',
      qty: 2,
      description: 'I am Jam',
    },
    {
      id: '480650',
      name: 'Rob',
      qty: 12,
      description: 'I am Rob',
    },
  ];

  findAll(): Item[] {
    return this.items;
  }
}
