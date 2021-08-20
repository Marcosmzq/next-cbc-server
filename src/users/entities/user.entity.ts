import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Role } from '../roles/role.enum';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: string;

  @Field()
  @Column()
  role: Role;

  @Field(() => [Ticket])
  @OneToMany(() => Ticket, (ticket) => ticket.user, {
    eager: true,
    cascade: true,
  })
  tickets: Ticket[];
}
