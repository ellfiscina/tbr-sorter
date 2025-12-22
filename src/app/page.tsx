import { fetchBooks } from "@/lib/data";

import AddBookModal from "./components/add-book-modal";
import BookItem from "./components/book-item";
import CallToAction from "./components/call-to-action";
import Header from "./components/header";
import Notification from "./components/notification";
import UpNext from "./components/up-next";

export default async function Home() {
  const books = await fetchBooks();
  const nextBook = await books[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream font-sans p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-accent">
          <Header />

          {books.length > 0 ? (
            <UpNext
              nextBook={nextBook}
              isRandomDisabled={books.length <= 1}
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
              <div className="space-y-3" role="list" aria-label="Reading queue">
                {books.slice(1).map((book, index) => (
                  <BookItem
                    key={book.id}
                    book={book}
                    index={index + 1}
                    totalBooks={books.length}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <AddBookModal />
      <Notification />
    </div>
  );
}
