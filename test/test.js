const {
  encryptMessage,
  decryptMessage,
  signMessage,
  verifySignature
} = require('../src');

// Sample PGP keys (use real ones in practice)
const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
...YOUR PUBLIC KEY HERE...
-----END PGP PUBLIC KEY BLOCK-----`;

const privateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
...YOUR PRIVATE KEY HERE...
-----END PGP PRIVATE KEY BLOCK-----`;

const passphrase = 'your_passphrase';

(async () => {
  const text = 'Secret Millionaire Email';

  const encrypted = await encryptMessage(text, publicKey);
  console.log('Encrypted:', encrypted);

  const decrypted = await decryptMessage(encrypted, privateKey, passphrase);
  console.log('Decrypted:', decrypted);

  const signed = await signMessage(text, privateKey, passphrase);
  console.log('Signed:', signed);

  const verified = await verifySignature(signed, publicKey);
  console.log('Verified Signature:', verified);
})();
