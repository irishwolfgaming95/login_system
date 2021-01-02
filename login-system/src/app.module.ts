import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
