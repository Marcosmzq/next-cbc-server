import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String, { name: 'createUser' })
  @Roles(Role.Admin)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findUserById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  @Roles(Role.Admin)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => String, { name: 'loginUser' })
  loginUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.usersService.login(username, password);
  }
}
