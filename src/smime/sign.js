import forge from 'node-forge';

/**
 * Sign a plain-text email message using S/MIME-style RSA-SHA256
 */
export function smimeSignReal(message, privateKeyPem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    const md = forge.md.sha256.create();
    md.update(message, 'utf8');

    const signature = privateKey.sign(md);

    return {
      message,
      signature: forge.util.encode64(signature),
      algorithm: 'SHA256-RSA',
    };
  } catch (error) {
    return { error: 'Signing failed', details: error.message };
  }
}
