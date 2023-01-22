import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createUrl } from "~/models/url.server";

export async function action({ request }: ActionArgs) {

  const formData = await request.formData();
  const originalUrl = formData.get("originalUrl");

  if (typeof originalUrl !== "string" || originalUrl.length === 0) {
    return json(
      { errors: { originalUrl: "URL is required", body: null } },
      { status: 400 }
    );
  }
  const url = await createUrl({ originalUrl });

  return redirect(`/urls/${url.id}`);
}

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const originalUrlRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.originalUrl) {
      originalUrlRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Url: </span>
          <input
            ref={originalUrlRef}
            autoFocus={true}
            name="originalUrl"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            type="url"
            autoComplete="url"
            aria-invalid={actionData?.errors?.originalUrl ? true : undefined}
            aria-errormessage={
              actionData?.errors?.originalUrl ? "originalUrl-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.originalUrl && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.originalUrl}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Create
        </button>
      </div>
    </Form>
  );
}
