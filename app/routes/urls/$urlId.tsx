import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteUrl, getUrl } from "~/models/url.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.urlId, "urlId not found");

  const url = await getUrl({ id: params.urlId });
  if (!url) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ url });
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.urlId, "noteId not found");

  await deleteUrl({ id: params.urlId });

  return redirect("/urls");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  const url = `http://www.shorter.com:3000/to/${data.url.shorterUrl}`;

  return (
    <div>
      <h3 className="text-3l font-bold">Short Url</h3>
      <a style={{wordBreak: 'break-all'}} className="font-bold text-blue-500" target="_blank" href={url}>{url}</a>
      <hr className="my-4" />
      <h3 className="text-3l font-bold">Original Url</h3>
      <a style={{ wordBreak: 'break-all' }} className="text-blue-500" target="_blank" href={data.url.originalUrl}>{data.url.originalUrl}</a>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Url not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
