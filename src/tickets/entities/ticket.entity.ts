import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Ticket {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  active: boolean;

  @Field()
  @Column()
  response: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn()
  user: User;
}
