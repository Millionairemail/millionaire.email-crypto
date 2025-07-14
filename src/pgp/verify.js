import * as openpgp from 'openpgp';

export async function pgpVerify(signedMessage, armoredPublicKey) {
  const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });

  const message = await openpgp.readCleartextMessage({ cleartextMessage: signedMessage });

  const verificationResult = await openpgp.verify({
    message,
    verificationKeys: publicKey
  });

  const { verified } = verificationResult.signatures[0];
  try {
    await verified;
    return { valid: true };
  } catch (e) {
    return { valid: false };
  }
}
