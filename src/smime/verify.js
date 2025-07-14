import forge from 'node-forge';

/**
 * Verify an S/MIME-style signature using a public certificate
 */
export function smimeVerifyReal({ message, signature }, certificatePem) {
  try {
    const cert = forge.pki.certificateFromPem(certificatePem);
    const publicKey = cert.publicKey;

    const md = forge.md.sha256.create();
    md.update(message, 'utf8');

    const decodedSig = forge.util.decode64(signature);
    const valid = publicKey.verify(md.digest().bytes(), decodedSig);

    return {
      valid,
      algorithm: 'SHA256-RSA',
      issuer: cert.issuer.attributes.map(attr => `${attr.name}=${attr.value}`).join(', ')
    };
  } catch (error) {
    return { error: 'Verification failed', details: error.message };
  }
}
