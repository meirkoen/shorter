import type { Url } from "@prisma/client";
import { prisma } from "~/db.server";
import * as crypto from "crypto";

export type { Url } from "@prisma/client";

export function getUrlListItems() {
  return prisma.url.findMany({
    select: { id: true, originalUrl: true, shorterUrl: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getOriginalUrl({
  shorterUrl,
}: Pick<Url, "shorterUrl">) {
  return prisma.url.findFirst({
    select: { originalUrl: true },
    where: { shorterUrl },
  });
}

export function createUrl({
  originalUrl,
}: Pick<Url, "originalUrl">) {
  const shorterUrl = getShorterUrl(originalUrl);
  
  const newUrl = {
    data: {
      originalUrl,
      shorterUrl,
    },
  };
  
  return prisma.url.create(newUrl);
}

export function getUrl({
  id,
}: Pick<Url, "id">) {
  return prisma.url.findFirst({
    select: { id: true, originalUrl: true, shorterUrl: true },
    where: { id },
  });
}

export function deleteUrl({
  id,
}: Pick<Url, "id">) {
  return prisma.url.deleteMany({
    where: { id },
  });
}


function getShorterUrl(originalUrl: string): string {
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
