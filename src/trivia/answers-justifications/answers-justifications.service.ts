import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTriviaAnswerInput } from '../dto/create-trivia-answers.input';
import { UpdateTriviaAnswerInput } from '../dto/update-trivia.answers.input';
import { AnswersJustification } from '../entities/trivia.answers.justification.entity';
import { Trivia } from '../entities/trivia.entity';

@Injectable()
export class AnswersJustificationsService {
  constructor(
    @Inject('TRIVIA_REPOSITORY')
    private triviaRepository: Repository<Trivia>,
    @Inject('ANSWER_JUSTIFICATION_REPOSITORY')
    private answerJustificationRepository: Repository<AnswersJustification>,
  ) {}

  async create(createAnswerJustificationInput: CreateTriviaAnswerInput) {
    const { triviaId, status, answer } = createAnswerJustificationInput;
    const trivia = await this.triviaRepository.findOne(triviaId);
    const newAnswerJustification = this.answerJustificationRepository.create({
      status,
      answer,
      trivia,
    });
    return this.answerJustificationRepository.save(newAnswerJustification);
  }

  findOne(id: number) {
    return this.answerJustificationRepository.findOne(id);
  }

  findAll() {
    return this.answerJustificationRepository.find();
  }

  async update(updateAnswerJustificationInput: UpdateTriviaAnswerInput) {
    const { answer, status, triviaId, answerId } =
      updateAnswerJustificationInput;
    const answerToBeUpdated = await this.answerJustificationRepository.findOne(
      answerId,
    );
    if (answer) answerToBeUpdated.answer = answer;
    if (status !== undefined) answerToBeUpdated.status = status;
    return this.answerJustificationRepository.save(answerToBeUpdated);
  }

  remove(id: number) {
    this.answerJustificationRepository.delete(id);
    return true;
  }
}
