import * as openpgp from 'openpgp';

export async function pgpEncrypt(message, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys: publicKey
  });

  return encrypted; // returns PGP armored string
}
