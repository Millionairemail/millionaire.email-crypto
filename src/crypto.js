/**
 * Simulate signing an email message (stub only)
 */
export function signEmailMessage(message, privateKey = 'FAKE_PRIVATE_KEY') {
  const signature = Buffer.from(message + privateKey).toString('base64');
  return {
    message,
    signature,
    algorithm: 'SHA256-RSA (simulated)',
  };
}

/**
 * Simulate verifying a signed email (stub only)
 */
export function verifySignature({ message, signature }, publicKey = 'FAKE_PUBLIC_KEY') {
  const expected = Buffer.from(message + 'FAKE_PRIVATE_KEY').toString('base64');
  const valid = expected === signature;
  return {
    valid,
    signer: valid ? 'Millionaire.email Authority (simulated)' : null,
  };
}

/**
 * Simulate public/private key generation (placeholder)
 */
export function generateKeyPair() {
  return {
    publicKey: 'FAKE_PUBLIC_KEY',
    privateKey: 'FAKE_PRIVATE_KEY',
    algorithm: 'RSA-2048 (simulated)',
  };
}
