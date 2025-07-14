import * as openpgp from 'openpgp';

export async function pgpSign(message, armoredPrivateKey, passphrase) {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey });
  const decryptedKey = await openpgp.decryptKey({ privateKey, passphrase });

  const signed = await openpgp.sign({
    message: await openpgp.createCleartextMessage({ text: message }),
    signingKeys: decryptedKey
  });

  return signed; // string
}
