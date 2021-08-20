import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateTriviaAnswerInput } from './create-trivia-answers.input';

@InputType()
export class UpdateTriviaAnswerInput extends PartialType(
  CreateTriviaAnswerInput,
) {
  @Field(() => Int)
  answerId: number;
}
