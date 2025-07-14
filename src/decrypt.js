export function decrypt(encryptedMessage, privateKey = 'FAKE_PRIVATE_KEY') {
  try {
    const decrypted = Buffer.from(encryptedMessage, 'base64').toString('utf-8');
    return {
      decrypted,
      algorithm: 'AES-256 (simulated)',
      privateKeyUsed: privateKey,
    };
  } catch (e) {
    return {
      error: 'Decryption failed',
      details: e.message,
    };
  }
}
