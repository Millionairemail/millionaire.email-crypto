import forge from 'node-forge';

export function smimeVerifyReal(smimePem, certPem) {
  try {
    if (!smimePem || !certPem) {
      throw new Error('PEM data missing');
    }

    const p7 = forge.pkcs7.messageFromPem(smimePem.trim());
    const cert = forge.pki.certificateFromPem(certPem.trim());

    const verified = p7.verify({
      signer: 0,
      certificate: cert
    });

    return {
      valid: verified,
      signer: p7.certificates?.[0]?.subject?.attributes || 'unknown',
    };
  } catch (err) {
    return { error: 'Verification failed', details: err.message };
  }
}
