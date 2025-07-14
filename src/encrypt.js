const openpgp = require('openpgp');

async function encryptMessage(text, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text }),
    encryptionKeys: publicKey
  });

  return encrypted;
}

module.exports = { encryptMessage };
