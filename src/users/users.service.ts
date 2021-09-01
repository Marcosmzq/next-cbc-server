import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './roles/role.enum';
import { CreateUserInput } from './dto/create-user.input';
import { validateLoginInput, validateRegisterInput } from './utils/validators';
import { UserInputError } from 'apollo-server-errors';
import { generateToken } from './utils/generateToken';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<string> {
    const { email, username, password } = createUserInput;
    const { errors, isValid } = validateRegisterInput(createUserInput);
    if (!isValid) {
      throw new UserInputError('Errors', { errors });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashPassword,
      role: Role.User,
    });
    const saveUser = await this.userRepository.save(newUser);
    const token = generateToken(saveUser);
    return token;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return 'user deleted';
  }

  async login(username: string, password: string): Promise<string> {
    const { errors, isValid } = validateLoginInput(username, password);
    if (!isValid) {
      throw new UserInputError('Errors', { errors });
    }
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      errors.general = 'User not found.';
      throw new UserInputError('User not found.', { errors });
    }
    const checkIfPasswordMatch = await bcrypt.compare(password, user.password);
    if (!checkIfPasswordMatch) {
      errors.general = 'Wrong crendetials.';
      throw new UserInputError('Wrong crendetials.', { errors });
    }
    const token = generateToken(user);
    return token;
  }
}
