import { pgpSign } from './pgp/sign.js';
import { smimeSign } from './smime/sign.js';

export async function signMessage(message, options) {
  const { type, privateKey, passphrase } = options;

  if (type === 'pgp') {
    return await pgpSign(message, privateKey, passphrase);
  }

  if (type === 'smime') {
    return smimeSign(message, privateKey);
  }

  throw new Error('Unsupported crypto type');
}
