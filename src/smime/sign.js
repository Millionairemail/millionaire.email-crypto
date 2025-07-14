export function smimeSign(message, privateKey = 'FAKE_PRIVATE_KEY') {
  const signature = Buffer.from(message + privateKey).toString('base64');
  return {
    message,
    signature,
    algorithm: 'RSA-SHA256 (simulated)',
  };
}
