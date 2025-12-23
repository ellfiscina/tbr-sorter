import { getServerSession } from "next-auth";

import { fetchBooks } from "@/lib/data";
import { getBookCover } from "@/lib/getBookCover";

import AddBookModal from "./components/add-book-modal";
import BookList from "./components/book-list";
import CallToAction from "./components/call-to-action";
import Header from "./components/header";
import LoginOverlay from "./components/login-overlay";
import Notification from "./components/notification";
import UpNext from "./components/up-next";

export default async function Home() {
  const session = await getServerSession();

  const books = session ? await fetchBooks() : [];
  const booksWithCovers = session
    ? await Promise.all(
        books.map(async (book) => ({
          ...book,
          cover: await getBookCover(book.isbn),
        }))
      )
    : [];

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-cream font-sans p-4 ${
        !session ? "pointer-events-none select-none" : ""
      }`}
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-accent">
          <Header email={session?.user.email ?? ""} />

          {books.length > 0 ? (
            <UpNext nextBook={booksWithCovers[0]} books={booksWithCovers} />
          ) : (
            <CallToAction />
          )}

          {books.length > 1 && (
            <div className="p-6 pt-0">
              <BookList initialBooks={booksWithCovers.slice(1)} />
            </div>
          )}
        </div>
      </div>

      <AddBookModal />
      <Notification />

      {!session && <LoginOverlay />}
    </div>
  );
}
