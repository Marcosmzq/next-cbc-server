import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';
import { CreateTriviaAnswerInput } from '../dto/create-trivia-answers.input';
import { UpdateTriviaAnswerInput } from '../dto/update-trivia.answers.input';
import { TriviaAnswers } from '../entities/trivia.answers.entity';
import { TriviaAnswersService } from './trivia-answers.service';

@Resolver()
export class TriviaAnswersResolver {
  constructor(private readonly triviaAnswersService: TriviaAnswersService) {}

  @Mutation(() => TriviaAnswers, { name: 'createTriviaAnswer' })
  @Roles(Role.Admin)
  create(
    @Args('createTriviaAnswerInput')
    createTriviaAnswerInput: CreateTriviaAnswerInput,
  ) {
    return this.triviaAnswersService.create(createTriviaAnswerInput);
  }

  @Query(() => TriviaAnswers, { name: 'findTriviaAnswerById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviaAnswersService.findOne(id);
  }

  @Query(() => [TriviaAnswers], { name: 'findAllTriviaAnswers' })
  findAll() {
    return this.triviaAnswersService.findAll();
  }

  @Mutation(() => TriviaAnswers, { name: 'updateTriviaAnswer' })
  @Roles(Role.Admin)
  update(
    @Args('updateTriviaAnswerInput')
    updateTriviaAnswerInput: UpdateTriviaAnswerInput,
  ) {
    return this.triviaAnswersService.update(updateTriviaAnswerInput);
  }

  @Mutation(() => Boolean, { name: 'removeTriviaAnswer' })
  @Roles(Role.Admin)
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.triviaAnswersService.remove(id);
  }
}
