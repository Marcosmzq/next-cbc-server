import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { DatabaseModule } from '../database/database.module';
import { ticketsProviders } from './tickets.providers';

@Module({
  imports: [DatabaseModule],
  providers: [TicketsResolver, TicketsService, ...ticketsProviders],
})
export class TicketsModule {}
