import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TriviaService } from './trivia.service';
import { TriviaResolver } from './trivia.resolver';
import { triviaProviders } from './trivia.providers';
import { TriviaAnswersResolver } from './trivia-answers/trivia-answers.resolver';
import { TriviaAnswersService } from './trivia-answers/trivia-answers.service';
import { AnswersJustificationsResolver } from './answers-justifications/answers-justifications.resolver';
import { AnswersJustificationsService } from './answers-justifications/answers-justifications.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    TriviaResolver,
    TriviaService,
    ...triviaProviders,
    TriviaAnswersResolver,
    TriviaAnswersService,
    AnswersJustificationsResolver,
    AnswersJustificationsService,
  ],
})
export class TriviaModule {}
