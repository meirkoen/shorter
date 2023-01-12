import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUrl } from "~/models/url.server";
import * as React from "react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const actionData = useActionData<typeof action>();
  const urlRef = React.useRef<HTMLInputElement>(null);
  const user = useOptionalUser();

  return (
    <>
      <header>
        {user ? (
          <Link to="/notes">
            View Notes for {user.email}
          </Link>
        ) : (
          <>
            <Link to="/join">
              Sign up
            </Link>
            <Link to="/login">
              Log In
            </Link>
          </>
        )}
      </header>
      <main className="">
        <h1 className="">
            Shorter
        </h1>
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter a URL to shorten
            </label>
            <div>
              <input
                ref={urlRef}
                id="email"
                required
                autoFocus={true}
                name="url"
                type="url"
                autoComplete="url"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Submit
          </button>
          <div>{actionData?.shorterUrl}</div>
        </Form>
      </main>
    </>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const originalUrl = formData.get("url") as string;

  const shorterUrl = await createUrl({ originalUrl });

  return shorterUrl
}

export const meta: MetaFunction = () => {
  return {
    title: "Shorter",
  };
};