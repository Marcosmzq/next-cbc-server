import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field(() => Int)
  userId: number;

  @Field()
  title: string;

  @Field()
  message: string;
}
