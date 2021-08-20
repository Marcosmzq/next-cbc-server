import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Trivia } from './trivia.entity';

@ObjectType()
@Entity()
export class AnswersJustification {
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
  status: boolean;

  @Field()
  @Column()
  answer: string;

  @ManyToOne(() => Trivia, (trivia) => trivia.answersJustifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  trivia: Trivia;
}
