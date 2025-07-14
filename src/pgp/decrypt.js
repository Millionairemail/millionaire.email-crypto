import * as openpgp from 'openpgp';

export async function pgpDecrypt(encryptedMessage, armoredPrivateKey, passphrase) {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey });
  const decryptedKey = await openpgp.decryptKey({ privateKey, passphrase });

  const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });

  const { data } = await openpgp.decrypt({
    message,
    decryptionKeys: decryptedKey
  });

  return data; // string
}
