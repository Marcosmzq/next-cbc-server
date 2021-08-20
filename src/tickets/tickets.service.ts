import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('TICKET_REPOSITORY')
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketInput: CreateTicketInput) {
    const { userId, title, message } = createTicketInput;
    const user = await this.userRepository.findOne(userId);
    const newTicket = this.ticketRepository.create({
      title,
      message,
      user,
      active: true,
      response: '',
    });
    return this.ticketRepository.save(newTicket);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    return this.ticketRepository.findOne(id);
  }

  async findByUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return this.ticketRepository.find({ where: { user } });
  }

  async toggleActive(id: number) {
    const ticket = await this.ticketRepository.findOne(id);
    ticket.active = !ticket.active;
    return this.ticketRepository.save(ticket);
  }

  async ticketResponse(id: number, responseMessage: string) {
    const ticket = await this.ticketRepository.findOne(id);
    ticket.response = responseMessage;
    return this.ticketRepository.save(ticket);
  }
  remove(id: number) {
    this.ticketRepository.delete(id);
    return 'deleted';
  }
}
