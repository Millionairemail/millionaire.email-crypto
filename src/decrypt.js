const openpgp = require('openpgp');

async function decryptMessage(encryptedText, privateKeyArmored, passphrase) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const decrypted = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedText }),
    decryptionKeys: privateKey
  });

  return decrypted.data;
}

module.exports = { decryptMessage };
