import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersResolver,
    UsersService,
    ...userProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}
