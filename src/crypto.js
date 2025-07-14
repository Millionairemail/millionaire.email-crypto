import { sign } from './sign.js';
import { verify } from './verify.js';
import { encrypt } from './encrypt.js';
import { decrypt } from './decrypt.js';

export function generateKeyPair() {
  return {
    publicKey: 'FAKE_PUBLIC_KEY',
    privateKey: 'FAKE_PRIVATE_KEY',
    algorithm: 'RSA-2048 (simulated)',
  };
}

export {
  sign,
  verify,
  encrypt,
  decrypt
};
