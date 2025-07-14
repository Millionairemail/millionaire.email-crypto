import * as openpgp from 'openpgp';

export async function pgpEncrypt(message, armoredPublicKey) {
  const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys: publicKey
  });

  return encrypted; // string
}
