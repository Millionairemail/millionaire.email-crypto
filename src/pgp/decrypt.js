import * as openpgp from 'openpgp';

export async function pgpDecrypt(encryptedMessage, privateKeyArmored, passphrase = '') {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
  await privateKey.decrypt(passphrase);

  const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey
  });

  return decrypted;
}
