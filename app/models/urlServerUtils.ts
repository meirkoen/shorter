import * as crypto from "crypto";

export function getShorterUrl(originalUrl: string) {
  if (!originalUrl) return false;

  const hash = getHash(originalUrl);
  const shuffledHash = getShuffledString(hash);
  const path = getPath(shuffledHash);

  console.log("originalUrl: ", originalUrl, "hash: ", hash, "shuffledHash: ", shuffledHash, "path: ", path);

  return path;
}

function getHash(originalUrl: string) {
  const hash = crypto.createHash('md5').update(originalUrl).digest("hex");
  return hash;
}

function getShuffledString(str: string) {
  return str.split('').sort(() => 0.5 - Math.random()).join('');
}

function getPath(shuffledHash: string) {
  let path = "";
  for (let i = 0; i < 5; i++) {
    const randomChar = shuffledHash.charAt(
      Math.floor(
        Math.random() * shuffledHash.length
      )
    );
    path += randomChar;
  }
  return path;
}
