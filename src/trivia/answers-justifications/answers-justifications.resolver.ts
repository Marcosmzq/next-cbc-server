import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';
import { CreateTriviaAnswerInput } from '../dto/create-trivia-answers.input';
import { UpdateTriviaAnswerInput } from '../dto/update-trivia.answers.input';
import { AnswersJustification } from '../entities/trivia.answers.justification.entity';
import { AnswersJustificationsService } from './answers-justifications.service';

@Resolver()
export class AnswersJustificationsResolver {
  constructor(
    private readonly answersJustificationService: AnswersJustificationsService,
  ) {}

  @Mutation(() => AnswersJustification, {
    name: 'createTriviaAnswerJustification',
  })
  @Roles(Role.Admin)
  create(
    @Args('createTriviaAnswerJustificationInput')
    createTriviaAnswerJustificationInput: CreateTriviaAnswerInput,
  ) {
    return this.answersJustificationService.create(
      createTriviaAnswerJustificationInput,
    );
  }

  @Query(() => AnswersJustification, {
    name: 'findTriviaAnswerJustificationById',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answersJustificationService.findOne(id);
  }

  @Query(() => [AnswersJustification], {
    name: 'findAllTriviaAnswersJustifications',
  })
  findAll() {
    return this.answersJustificationService.findAll();
  }

  @Mutation(() => AnswersJustification, {
    name: 'updateTriviaAnswerJustification',
  })
  @Roles(Role.Admin)
  update(
    @Args('updateTriviaAnswerJustificationInput')
    updateTriviaAnswerJustificationInput: UpdateTriviaAnswerInput,
  ) {
    return this.answersJustificationService.update(
      updateTriviaAnswerJustificationInput,
    );
  }

  @Mutation(() => Boolean, { name: 'removeTriviaAnswerJustification' })
  @Roles(Role.Admin)
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.answersJustificationService.remove(id);
  }
}
