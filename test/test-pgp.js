import * as openpgp from 'openpgp';
import {
  pgpEncrypt
} from '../src/pgp/encrypt.js';
import {
  pgpDecrypt
} from '../src/pgp/decrypt.js';
import {
  pgpSign
} from '../src/pgp/sign.js';
import {
  pgpVerify
} from '../src/pgp/verify.js';

const MESSAGE = 'Millionaire.email — Identity is the new currency';

async function runPGPTest() {
  console.log('🔐 Generating PGP keypair...');

  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name: 'Millionaire Identity', email: 'identity@millionaire.email' }],
    passphrase: 'secret'
  });

  console.log('✅ Keypair generated');

  // SIGN
  console.log('\n✍️ Signing message...');
  const signedMessage = await pgpSign(MESSAGE, privateKey, 'secret');
  console.log('📩 Signed Message:\n', signedMessage.slice(0, 100) + '...');

  // VERIFY
  console.log('\n🔍 Verifying signature...');
  const verification = await pgpVerify(signedMessage, publicKey);
  console.log('✅ Signature valid?', verification.valid);

  if (!verification.valid) throw new Error('❌ PGP signature verification failed');

  // ENCRYPT
  console.log('\n🔒 Encrypting message...');
  const encryptedMessage = await pgpEncrypt(MESSAGE, publicKey);
  console.log('📦 Encrypted:\n', encryptedMessage.slice(0, 100) + '...');

  // DECRYPT
  console.log('\n🔓 Decrypting message...');
  const decryptedMessage = await pgpDecrypt(encryptedMessage, privateKey, 'secret');
  console.log('✅ Decrypted:', decryptedMessage);

  if (decryptedMessage !== MESSAGE) throw new Error('❌ PGP decryption failed');

  console.log('\n🎉 All PGP tests passed successfully.');
}

runPGPTest().catch(console.error);
