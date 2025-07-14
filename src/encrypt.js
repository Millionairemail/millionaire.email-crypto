export function encrypt(message, publicKey = 'FAKE_PUBLIC_KEY') {
  const encrypted = Buffer.from(message).toString('base64');
  return {
    encrypted,
    algorithm: 'AES-256 (simulated)',
    publicKeyUsed: publicKey,
  };
}
