import { InputType, Field } from '@nestjs/graphql';
import { Subject } from '../enums/subject.enum';
import { Exam } from '../enums/exam.enum';

@InputType()
export class CreateTriviaInput {
  @Field()
  exam?: Exam;

  @Field()
  subject?: Subject;

  @Field()
  question?: string;

  @Field()
  explanation?: string;

  @Field()
  reference?: string;
}
