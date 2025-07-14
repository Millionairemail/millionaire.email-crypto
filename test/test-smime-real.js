import { smimeSignReal } from '../src/smime/sign.js';
import { smimeVerifyReal } from '../src/smime/verify.js';

// Example RSA keypair (DO NOT USE in production)
const privateKeyPem = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDZ+NZ7fA0bnMZQGsm9mjAiJBFxk+xUQklQdE8MaZo2Xe+2lEel
3F4GR0OXY7b7AEnR2W/3K2R53OqYlXxtI0kni9Q2eQ1sTyS8Pbe+nKgQk7D+aI3b
a71QYuH/kBVcJZlM9xZ4utUZmPZT2lBtJ7cXsH5acY4HPJ1mvI2aetJs/QIDAQAB
AoGAO2mfb7Mu6L0UbWifEbzRCZp3l+zSoPC9ChRszKij9PGHoU6NQv33z9Rc3Z4r
...
-----END RSA PRIVATE KEY-----
`;

const certPem = `
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAK4xR9eEY2E5MA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAklOMQswCQYDVQQIDAJLUjEPMA0GA1UEBwwGQmFuZ2Fsb3JlMQ0wCwYDVQQK
DARUZXN0MB4XDTIzMDkyNTA4MTUwN1oXDTI0MDkyNDA4MTUwN1owRTELMAkGA1UE
...
-----END CERTIFICATE-----
`;

const message = 'This is a secure message from Millionaire.email';

const signed = smimeSignReal(message, privateKeyPem);
console.log('🖊 Signed:', signed);

const verified = smimeVerifyReal(signed, certPem);
console.log('🔍 Verified:', verified);

if (!verified.valid) throw new Error('❌ Signature is invalid');

console.log('✅ S/MIME real crypto test passed');
