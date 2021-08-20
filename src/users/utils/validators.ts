import { CreateUserInput } from '../dto/create-user.input';

export const validateRegisterInput = (createUserInput: CreateUserInput) => {
  const { username, email, password, confirmPassword } = createUserInput;
  const errors: any = {};

  if (username.trim() === '') {
    errors.username = 'The username must not be empty.';
  }
  if (email.trim() === '') {
    errors.email = 'The email must not be empty.';
  } else {
    const regExpEmail =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExpEmail)) {
      errors.email = 'The email is not valid.';
    }
  }
  if (password === '') {
    errors.password = 'The password must not be empty.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'The passwords must be match.';
  }
  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username: string, password: string) => {
  const errors: any = {};

  if (username.trim() === '') {
    errors.username = 'The username must not be empty.';
  }
  if (password.trim() === '') {
    errors.password = 'The email must not be empty.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
