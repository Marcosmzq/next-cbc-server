const jwt = require('jsonwebtoken');
import { User } from '../entities/user.entity';

export const generateToken = (user: User): string => {
  const { id, username, email, role } = user;
  return jwt.sign(
    {
      id,
      email,
      username,
      role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '72h' },
  );
};
