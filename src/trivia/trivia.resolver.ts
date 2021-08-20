import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TriviaService } from './trivia.service';
import { Trivia } from './entities/trivia.entity';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/role.enum';

@Resolver(() => Trivia)
export class TriviaResolver {
  constructor(private readonly triviaService: TriviaService) {}

  @Mutation(() => Trivia, { name: 'createTrivia' })
  @Roles(Role.Admin)
  create(@Args('createTriviaInput') createTriviaInput: CreateTriviaInput) {
    return this.triviaService.create(createTriviaInput);
  }

  @Query(() => [Trivia], { name: 'findAllTrivias' })
  findAll() {
    return this.triviaService.findAll();
  }

  @Query(() => Trivia, { name: 'findOneTrivia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviaService.findOne(id);
  }

  @Query(() => [Trivia], { name: 'findBySubject' })
  findBySubject(@Args('subject') subject: string) {
    return this.triviaService.findBySubject(subject);
  }

  @Query(() => [Trivia], { name: 'findBySubjectAndExam' })
  findBySubjectAndExam(
    @Args('subject') subject: string,
    @Args('exam') exam: string,
  ) {
    return this.triviaService.findBySubjectAndExam(subject, exam);
  }

  @Query(() => Trivia, { name: 'findRandomTriviaBySubjectAndExam' })
  findRandom(@Args('subject') subject: string, @Args('exam') exam: string) {
    return this.triviaService.findRandomTriviaBySubjectAndExam(subject, exam);
  }

  @Mutation(() => Trivia, { name: 'updateTrivia' })
  @Roles(Role.Admin)
  update(@Args('updateTriviaInput') updateTriviaInput: UpdateTriviaInput) {
    return this.triviaService.update(updateTriviaInput.id, updateTriviaInput);
  }

  @Mutation(() => Boolean, { name: 'removeTrivia' })
  @Roles(Role.Admin)
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.triviaService.remove(id);
  }
}
