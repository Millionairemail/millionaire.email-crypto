import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Verifies a PKCS#7 (S/MIME) signed message using OpenSSL.
 * @param {string} pkcs7 - The signed PKCS#7 message (e.g., from smimeSignReal).
 * @param {string} certPem - The public certificate in PEM format.
 * @returns {{ valid: boolean, message?: string, error?: string, details?: string }}
 */
export function smimeVerifyReal(pkcs7, certPem) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'smime-'));
  const signedPath = path.join(tmpDir, 'signed.p7s');
  const certPath = path.join(tmpDir, 'cert.pem');

  try {
    // Write the PKCS#7 content to file
    fs.writeFileSync(signedPath, pkcs7);
    fs.writeFileSync(certPath, certPem);

    // Run OpenSSL to verify the message
    const output = execSync(
      `openssl smime -pk7verify -in "${signedPath}" -certfile "${certPath}" -CAfile "${certPath}" -noverify`,
      { encoding: 'utf8' }
    );

    return {
      valid: true,
      message: output.trim()
    };
  } catch (err) {
    return {
      valid: false,
      error: 'Verification failed',
      details: err.stderr?.toString() || err.message
    };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}
