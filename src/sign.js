export function sign(message, privateKey = 'FAKE_PRIVATE_KEY') {
  const signature = Buffer.from(message + privateKey).toString('base64');
  return {
    message,
    signature,
    algorithm: 'SHA256-RSA (simulated)',
    signedAt: new Date().toISOString(),
  };
}
