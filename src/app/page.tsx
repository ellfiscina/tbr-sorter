import { getServerSession } from "next-auth";

import { fetchBooks } from "@/lib/data";
import { getBookCover } from "@/lib/getBookCover";

import AddBookModal from "./components/add-book-modal";
import BookList from "./components/book-list";
import CallToAction from "./components/call-to-action";
import Header from "./components/header";
import { Login } from "./components/login";
import Notification from "./components/notification";
import UpNext from "./components/up-next";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return <Login />;
  }

  const books = await fetchBooks();
  const booksWithCovers = await Promise.all(
    books.map(async (book) => ({
      ...book,
      cover: await getBookCover(book.isbn),
    }))
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream font-sans p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-accent">
          <Header />

          {books.length > 0 ? (
            <UpNext
              nextBook={booksWithCovers[0]}
              books={booksWithCovers}
            />
          ) : (
            <CallToAction />
          )}

          {books.length > 1 && (
            <div className="p-6 pt-0">
              <div className="mb-3">
                <h3 className="text-gray-700 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-blush rounded-lg flex items-center justify-center text-xs" aria-hidden="true">
                    {books.length - 1}
                  </span>
                  <span aria-label={`${books.length - 1} books in your queue`}>
                    In Your Queue
                  </span>
                </h3>
              </div>
              <BookList initialBooks={booksWithCovers.slice(1)} />
            </div>
          )}
        </div>
      </div>
      <AddBookModal />
      <Notification />
    </div>
  );
}
