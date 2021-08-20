import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Trivia } from './entities/trivia.entity';

@Injectable()
export class TriviaService {
  constructor(
    @Inject('TRIVIA_REPOSITORY')
    private triviaRepository: Repository<Trivia>,
  ) {}
  create(createTriviaInput: CreateTriviaInput) {
    const trivia = this.triviaRepository.create(createTriviaInput);
    return this.triviaRepository.save(trivia);
  }

  findAll() {
    return this.triviaRepository.find();
  }

  findOne(id: number) {
    return this.triviaRepository.findOne(id);
  }

  findBySubject(subject: string) {
    return this.triviaRepository.find({ where: { subject } });
  }

  findBySubjectAndExam(subject: string, exam: string) {
    return this.triviaRepository.find({ where: { subject, exam } });
  }

  async findRandomTriviaBySubjectAndExam(subject: string, exam: string) {
    const getRandomTrivia = await this.triviaRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .where({ subject, exam })
      .limit(1)
      .execute();
    const triviaRandomId = getRandomTrivia[0].Trivia_id;
    return this.triviaRepository.findOne(triviaRandomId);
  }

  async update(id: number, updateTriviaInput: UpdateTriviaInput) {
    const { question, explanation, exam, subject, reference } =
      updateTriviaInput;
    const triviaToBeUpdated = await this.triviaRepository.findOne(id);
    if (question) triviaToBeUpdated.question = question;
    if (explanation) triviaToBeUpdated.explanation = explanation;
    if (exam) triviaToBeUpdated.exam = exam;
    if (subject) triviaToBeUpdated.subject = subject;
    if (reference) triviaToBeUpdated.reference = reference;

    return this.triviaRepository.save(triviaToBeUpdated);
  }

  remove(id: number) {
    this.triviaRepository.delete(id);
    return true;
  }
}
