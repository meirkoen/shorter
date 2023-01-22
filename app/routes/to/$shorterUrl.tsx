import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getOriginalUrl } from "~/models/url.server";

export async function loader({ params }: LoaderArgs) {
  const {shorterUrl} = params;
  if (shorterUrl === undefined) return null;

  const originalUrl = await getOriginalUrl({ shorterUrl });
  console.log(originalUrl);
  if (originalUrl !== undefined && originalUrl?.originalUrl) {
    return redirect(originalUrl?.originalUrl);
  }
  return redirect("/");
}