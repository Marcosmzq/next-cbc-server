import { Connection, Repository } from 'typeorm';
import { Trivia } from './entities/trivia.entity';
import { TriviaAnswers } from './entities/trivia.answers.entity';
import { AnswersJustification } from './entities/trivia.answers.justification.entity';

export const triviaProviders = [
  {
    provide: 'TRIVIA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Trivia),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TRIVIA_ANSWERS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TriviaAnswers),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ANSWER_JUSTIFICATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AnswersJustification),
    inject: ['DATABASE_CONNECTION'],
  },
];
