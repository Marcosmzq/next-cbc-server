import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

export const ticketsProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TICKET_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Ticket),
    inject: ['DATABASE_CONNECTION'],
  },
];
