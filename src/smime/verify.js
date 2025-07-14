import { writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

export function smimeVerifyReal(smimePem, certPem) {
  const tempDir = tmpdir();
  const msgPath = path.join(tempDir, 'smime.p7s');
  const certPath = path.join(tempDir, 'cert.pem');

  try {
    // Write files
    writeFileSync(msgPath, smimePem);
    writeFileSync(certPath, certPem);

    // Use OpenSSL CLI to verify the signature
    const result = execSync(`openssl smime -verify -in ${msgPath} -certfile ${certPath} -CAfile ${certPath} -noverify`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    // Cleanup
    unlinkSync(msgPath);
    unlinkSync(certPath);

    return {
      valid: true,
      message: result.trim(),
    };
  } catch (err) {
    return {
      valid: false,
      error: 'Verification failed',
      details: err.message,
    };
  }
}
