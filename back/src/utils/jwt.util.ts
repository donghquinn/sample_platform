import Jwt from 'jsonwebtoken';

export function verifyAsync(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, secret, (error, data) => {
      if (error) reject(error);
      return resolve(data);
    });
  });
}
