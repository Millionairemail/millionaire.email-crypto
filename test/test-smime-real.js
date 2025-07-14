import { smimeSignReal } from '../src/smime/sign.js';
import { smimeVerifyReal } from '../src/smime/verify.js';

const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1uBhIGYwlXgVnrsfCdcD+JeE5Iyl2+JGEsN6Ij0Md8eEKZ5X
xUuRfLqYxPrbRgz8HuqV7ZG8O1EOoCexQ1HXYTPvEZMke9JK08YckOYz3m9R2NHX
Q1EDKPlY2uTWyALC8lb5T+v6KX0FVSpbmPwlBC5DKKjUHGWSP8wldCJHFikxEAVV
NH48F7VJ8OogLfQmpKlyIXOVvFgSBAxFJxHL7tvz13MVJbhqUzGRoKOCiQiPl/k+
aWHT8em7Di5gzOTGObMRrUrGbJbfMl5Y92RBNoRmmBKaTNhKMVwaEs2fRmn6yZ4J
aS4yRU6t57V8XQK2DKp5YBg2iQIDAQABAoIBAQC7CMgQUcHxfXcCZ6e/kFDqzv4U
...
-----END RSA PRIVATE KEY-----`;

const certPem = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJALRZp3VtaDlcMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAklOMQswCQYDVQQIDAJLUjEPMA0GA1UEBwwGQmFuZ2Fsb3JlMQ0wCwYDVQQK
DARUZXN0MB4XDTI1MDcxNDA4MjExNVoXDTI2MDcxMzA4MjExNVowRTELMAkGA1UE
...
-----END CERTIFICATE-----`;

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
    process.exit(1); // Make CI fail
  }
}

run();
