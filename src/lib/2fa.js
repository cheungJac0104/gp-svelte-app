// 2fa.js
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';

if (typeof window !== 'undefined') {
window.Buffer = Buffer;
}

// Override the default createDigest function in otplib to use crypto-js
authenticator.options = {
    createDigest: (algorithm, key, counter) => {
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, CryptoJS.enc.Hex.parse(key));
      hmac.update(CryptoJS.enc.Hex.parse(counter));
      const hash = hmac.finalize();
      return hash.toString(CryptoJS.enc.Hex); // Return as a hexadecimal string
    }
  };

function generateRandomSecret(length = 16) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    
    // Convert to base32 (you may need to adjust this based on your requirements)
    return Array.from(array).map(b => String.fromCharCode(65 + (b % 26))).join('');
  }

  authenticator.generateSecret = generateRandomSecret;

export function generateSecret() {
  const secret = authenticator.generateSecret();
  return secret;
}

/**
 * @param {string} secret
 */
export function generateQRCode(secret) {
  const otpauthUrl = authenticator.keyuri('admin', 'HKHC', secret);
  return QRCode.toDataURL(otpauthUrl);
}

/**
 * @param {string} secret
 * @param {string} token
 */
export function verifyToken(secret, token) {
    return authenticator.check(token, secret);
  }
