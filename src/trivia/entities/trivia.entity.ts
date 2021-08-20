import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Exam } from '../enums/exam.enum';
import { Subject } from '../enums/subject.enum';
import { TriviaAnswers } from './trivia.answers.entity';
import { AnswersJustification } from './trivia.answers.justification.entity';

@ObjectType()
@Entity()
export class Trivia {
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
  exam: Exam;

  @Field()
  @Column()
  subject: Subject;

  @Field()
  @Column()
  question: string;

  @Field()
  @Column()
  explanation: string;

  @Field()
  @Column()
  reference: string;

  @Field(() => [TriviaAnswers])
  @OneToMany(() => TriviaAnswers, (triviaAnswers) => triviaAnswers.trivia, {
    eager: true,
    cascade: true,
  })
  triviaAnswers: TriviaAnswers[];

  @Field(() => [AnswersJustification])
  @OneToMany(
    () => AnswersJustification,
    (answersJustifications) => answersJustifications.trivia,
    {
      eager: true,
      cascade: true,
    },
  )
  answersJustifications: AnswersJustification[];
}
