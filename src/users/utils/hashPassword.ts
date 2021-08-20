const bcrypt = require('bcryptjs');

export const hashPassword = async (password: string) => {
  const passwordHashed: string = await bcrypt.hash(password, 10);
  return passwordHashed;
};
