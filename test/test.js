import {
  generateKeyPair,
  sign,
  verify,
  encrypt,
  decrypt,
} from '../src/index.js';

const { privateKey, publicKey } = generateKeyPair();
console.log('🔐 Key Pair:', { privateKey, publicKey });

// 🔏 Sign
const signed = sign('Millionaire Secret', privateKey);
console.log('✍️ Signed:', signed);

// ✅ Verify
const verified = verify(signed, publicKey);
console.log('🔍 Verified:', verified);
if (!verified.valid) throw new Error('❌ Signature failed');

// 🔐 Encrypt
const encrypted = encrypt('Top Secret Content', publicKey);
console.log('🔒 Encrypted:', encrypted);

// 🔓 Decrypt
const decrypted = decrypt(encrypted.encrypted, privateKey);
console.log('🔓 Decrypted:', decrypted);
if (decrypted.decrypted !== 'Top Secret Content') throw new Error('❌ Decryption mismatch');

console.log('🎉 All crypto module tests passed');
