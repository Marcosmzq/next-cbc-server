import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTriviaAnswerInput {
  @Field(() => Int)
  triviaId?: number;

  @Field()
  answer?: string;

  @Field()
  status?: boolean;
}
