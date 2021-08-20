import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TriviaModule } from './trivia/trivia.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    DatabaseModule,
    UsersModule,
    TriviaModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
