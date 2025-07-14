const openpgp = require('openpgp');

async function verifySignature(signedMessage, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const message = await openpgp.readMessage({ armoredMessage: signedMessage });
  const verificationResult = await openpgp.verify({
    message,
    verificationKeys: publicKey
  });

  const verified = await verificationResult.signatures[0].verified;
  try {
    await verified;
    return true;
  } catch {
    return false;
  }
}

module.exports = { verifySignature };
