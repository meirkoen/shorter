import type { Url } from "@prisma/client";
import { prisma } from "~/db.server";
import { getShorterUrl } from "./urlServerUtils";

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

  if (!shorterUrl) throw new Error("shorterUrl was not created");
  
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