import jwt from 'jsonwebtoken'


export const generateToken = ({ id }) => {
  return jwt.sign({ id }, process.env.SEC_KEY, {
    expiresIn: process.env.SEC_EXPIRE
  });
};
