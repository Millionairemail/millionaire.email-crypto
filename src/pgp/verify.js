import * as openpgp from 'openpgp';

export async function pgpVerify(signedMessage, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const message = await openpgp.readCleartextMessage({ cleartextMessage: signedMessage });

  const verification = await openpgp.verify({
    message,
    verificationKeys: publicKey
  });

  const { valid } = await verification.signatures[0].verified;
  return { valid };
}
