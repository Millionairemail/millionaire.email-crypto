const { encryptMessage } = require('./encrypt');
const { decryptMessage } = require('./decrypt');
const { signMessage } = require('./sign');
const { verifySignature } = require('./verify');

module.exports = {
  encryptMessage,
  decryptMessage,
  signMessage,
  verifySignature
};
