const OPEN_LIBRARY = "https://covers.openlibrary.org/b/isbn";

export async function getBookCover(isbn?: string) {
  if (isbn) {
    const sizes = ["M", "L", "S"];

    for (const size of sizes) {
      const url = `${OPEN_LIBRARY}/${isbn}-${size}.jpg?default=false`;
      const res = await fetch(url, { method: "HEAD" });

      if (res.ok) {
        return url;
      }
    }
  }

  return "";
}
