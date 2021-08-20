import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/role.enum';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket, { name: 'createTicket' })
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'findAllTickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => [Ticket], { name: 'findTicketsByUser' })
  findByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.ticketsService.findByUser(userId);
  }

  @Query(() => Ticket, { name: 'findTicketById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket, { name: 'toggleTikectStatus' })
  @Roles(Role.Admin)
  toggleTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.toggleActive(id);
  }

  @Mutation(() => Ticket, { name: 'ticketResponse' })
  @Roles(Role.Admin)
  ticketResponse(
    @Args('id', { type: () => Int }) id: number,
    @Args('responseMessage', { type: () => String }) responseMessage: string,
  ) {
    return this.ticketsService.ticketResponse(id, responseMessage);
  }

  @Mutation(() => String, { name: 'removeTicket' })
  @Roles(Role.Admin)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }
}
