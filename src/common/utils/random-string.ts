import 'dotenv/config';

export const randomString = (length = 60) => {
  let output = '';
  const secret = process.env.ACCESS_TOKEN_SECRET || '';

  for (let i = 0; i < length; i++) {
    output += secret[Math.floor(Math.random() * secret.length)];
  }

  return output;
};
