const openpgp = require('openpgp');

async function signMessage(text, privateKeyArmored, passphrase) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const signed = await openpgp.sign({
    message: await openpgp.createMessage({ text }),
    signingKeys: privateKey
  });

  return signed;
}

module.exports = { signMessage };
