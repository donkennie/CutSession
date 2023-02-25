import crypto from 'crypto';

function generateRandomString() {
  const length = Math.floor(Math.random() * (9 - 6 + 1)) + 6; // generate a random length between 6 to 9
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length); // generate a random string of the specified length
}

export default generateRandomString;