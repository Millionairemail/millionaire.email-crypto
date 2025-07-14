export function verify({ message, signature }, publicKey = 'FAKE_PUBLIC_KEY') {
  const expectedSignature = Buffer.from(message + 'FAKE_PRIVATE_KEY').toString('base64');
  const valid = signature === expectedSignature;

  return {
    valid,
    algorithm: 'SHA256-RSA (simulated)',
    signer: valid ? 'Millionaire.email Authority (simulated)' : null,
  };
}
