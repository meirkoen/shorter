import { Link } from "@remix-run/react";

export default function UrlIndexPage() {
  return (
    <p>
      No url selected. Select a url on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new url.
      </Link>
    </p>
  );
}
