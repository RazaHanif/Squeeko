'use strict';

const hash = require('@better-auth/utils/hash');
const chacha = require('@noble/ciphers/chacha');
const utils$2 = require('@noble/ciphers/utils');
const webcrypto = require('@noble/ciphers/webcrypto');
const base64 = require('@better-auth/utils/base64');
const jose = require('jose');
const scrypt = require('@noble/hashes/scrypt');
const utils = require('@better-auth/utils');
const hex = require('@better-auth/utils/hex');
const utils$1 = require('@noble/hashes/utils');
const random = require('../shared/better-auth.CYeOI8C-.cjs');
require('@better-auth/utils/random');

async function signJWT(payload, secret, expiresIn = 3600) {
  const jwt = await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
  return jwt;
}

function constantTimeEqual(a, b) {
  const aBuffer = new Uint8Array(a);
  const bBuffer = new Uint8Array(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < aBuffer.length; i++) {
    c |= aBuffer[i] ^ bBuffer[i];
  }
  return c === 0;
}

async function hashToBase64(data) {
  const buffer = await hash.createHash("SHA-256").digest(data);
  return base64.base64.encode(buffer);
}
async function compareHash(data, hash$1) {
  const buffer = await hash.createHash("SHA-256").digest(
    typeof data === "string" ? new TextEncoder().encode(data) : data
  );
  const hashBuffer = base64.base64.decode(hash$1);
  return constantTimeEqual(buffer, hashBuffer);
}

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scrypt.scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.hex.encode(utils.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.hex.encode(key)}`;
};
const verifyPassword = async ({
  hash,
  password
}) => {
  const [salt, key] = hash.split(":");
  const targetKey = await generateKey(password, salt);
  return constantTimeEqual(targetKey, utils$1.hexToBytes(key));
};

const symmetricEncrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await hash.createHash("SHA-256").digest(key);
  const dataAsBytes = utils$2.utf8ToBytes(data);
  const chacha$1 = webcrypto.managedNonce(chacha.xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return utils$2.bytesToHex(chacha$1.encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await hash.createHash("SHA-256").digest(key);
  const dataAsBytes = utils$2.hexToBytes(data);
  const chacha$1 = webcrypto.managedNonce(chacha.xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha$1.decrypt(dataAsBytes));
};

exports.generateRandomString = random.generateRandomString;
exports.compareHash = compareHash;
exports.constantTimeEqual = constantTimeEqual;
exports.hashPassword = hashPassword;
exports.hashToBase64 = hashToBase64;
exports.signJWT = signJWT;
exports.symmetricDecrypt = symmetricDecrypt;
exports.symmetricEncrypt = symmetricEncrypt;
exports.verifyPassword = verifyPassword;
