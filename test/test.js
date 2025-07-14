import { pgpEncrypt } from '../src/pgp/encrypt.js';
import { pgpDecrypt } from '../src/pgp/decrypt.js';
import { pgpSign } from '../src/pgp/sign.js';
import { pgpVerify } from '../src/pgp/verify.js';

import { smimeSignReal } from '../src/smime/sign.js';
import { smimeVerifyReal } from '../src/smime/verify.js';

console.log('✅ Imports successful for both PGP and S/MIME modules.');
