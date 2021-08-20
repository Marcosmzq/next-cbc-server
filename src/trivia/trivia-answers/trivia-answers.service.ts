import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTriviaAnswerInput } from '../dto/create-trivia-answers.input';
import { UpdateTriviaAnswerInput } from '../dto/update-trivia.answers.input';
import { TriviaAnswers } from '../entities/trivia.answers.entity';
import { Trivia } from '../entities/trivia.entity';

//TODO: Cambiar nombre de la entidad para que sea singular, la trivia a la que pertenece una respuesta no puede ser null
//TODO: eliminar await de los metodos en donde no es necesario, ya que la promesa es mas rapida.
@Injectable()
export class TriviaAnswersService {
  constructor(
    @Inject('TRIVIA_ANSWERS_REPOSITORY')
    private triviaAnswersRepository: Repository<TriviaAnswers>,
    @Inject('TRIVIA_REPOSITORY')
    private triviaRepository: Repository<Trivia>,
  ) {}

  async create(createTriviaAnswerInput: CreateTriviaAnswerInput) {
    const { triviaId, status, answer } = createTriviaAnswerInput;
    const trivia = await this.triviaRepository.findOne(triviaId);
    const newAnswer = this.triviaAnswersRepository.create({
      status,
      answer,
      trivia,
    });
    //trivia.triviaAnswers = [...trivia.triviaAnswers, newAnswer];
    //this.triviaRepository.save(trivia);
    return this.triviaAnswersRepository.save(newAnswer);
  }

  findOne(id: number) {
    return this.triviaAnswersRepository.findOne(id);
  }

  findAll() {
    return this.triviaAnswersRepository.find();
  }

  async update(updateTriviaAnswerInput: UpdateTriviaAnswerInput) {
    //TODO: Se podrian nombrar los paramentros del input como "newAnswer" "newStatus", para que se entienda mejor el codigo.
    //TODO: el metodo upodate en el input tiene un parametro id que no usa
    //TODO: Al crear una trivia answer y justificaion retorna null
    //TODO: Al crear respuesta y justificacion, se nececita buscar la respuesta especifica dentro de la trivia que se quiere actualziar, sino actualiza siempre la 1 por default
    const { answer, status, answerId } = updateTriviaAnswerInput;
    const answerToBeUpdated = await this.triviaAnswersRepository.findOne(
      answerId,
    );
    if (answer) answerToBeUpdated.answer = answer;
    if (status !== undefined) answerToBeUpdated.status = status;
    return this.triviaAnswersRepository.save(answerToBeUpdated);
  }

  remove(id: number) {
    this.triviaAnswersRepository.delete(id);
    return true;
  }
}
