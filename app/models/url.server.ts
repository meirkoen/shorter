import type { Url } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Url } from "@prisma/client";

export function getUrl({
  id,
}: Pick<Url, "id">) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function createUrl({
  originalUrl,
}: Pick<Url, "originalUrl">) {
  const shorterUrl = "https://shorterurl.com";
  
  console.log("originalUrl", originalUrl, "shorterUrl", shorterUrl);
  const newUrl = {
    data: {
      originalUrl,
      shorterUrl,
    },
  };

  return prisma.url.create(newUrl);
}

