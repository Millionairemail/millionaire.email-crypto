import { smimeSignReal } from '../src/smime/sign.js';
import { smimeVerifyReal } from '../src/smime/verify.js';

const privateKeyPem = process.env.SMIME_KEY_PEM;
const certPem = process.env.SMIME_CERT_PEM;

if (!privateKeyPem || !certPem) {
  console.error('❌ Missing SMIME_KEY_PEM or SMIME_CERT_PEM');
  process.exit(1);
}

const message = 'This is a secure message from Millionaire.email';

async function run() {
  try {
    const signed = await smimeSignReal(message, privateKeyPem, certPem);
    console.log('🖊 Signed:', signed);

    const verified = await smimeVerifyReal(signed, certPem);
    console.log('🔍 Verified:', verified);

    if (!verified.valid) throw new Error('❌ Signature is invalid');

    console.log('✅ S/MIME real crypto test passed');
  } catch (err) {
    console.error('❌ S/MIME test failed:', err);
    process.exit(1);
  }
}

run();
