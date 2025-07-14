import * as openpgp from 'openpgp';

export async function pgpSign(message, privateKeyArmored, passphrase = '') {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
  await privateKey.decrypt(passphrase);

  const signed = await openpgp.sign({
    message: await openpgp.createMessage({ text: message }),
    signingKeys: privateKey
  });

  return signed;
}
