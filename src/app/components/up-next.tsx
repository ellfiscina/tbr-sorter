'use client'
import Image from "next/image";

import { BookOpen, CheckCircle2, Shuffle } from "lucide-react";

import { useNotification } from "@/contexts/notification-context";
import { removeBook, reorderBooks } from "@/lib/actions";
import { Book } from "@/lib/types";

interface UpNextProps {
  books: Book[];
  nextBook: Book;
}

const UpNext = ({ books, nextBook } : UpNextProps) => {
  const { showNotification } = useNotification();

  const handleRandomPick = () => {
    if (books.length <= 1) return;

    const candidates = books.filter(book => book.id !== nextBook.id);
    const randomBook =
      candidates[Math.floor(Math.random() * candidates.length)];

    const updates: typeof books = [];
    updates.push({
      ...randomBook,
      order: 0,
    });

    updates.push({
      ...nextBook,
      order: 1,
    });

    for (const book of books) {
      if (
        book.id !== randomBook.id &&
        book.id !== nextBook.id &&
        book.order < randomBook.order
      ) {
        updates.push({
          ...book,
          order: book.order + 1,
        });
      }
    }

    reorderBooks(updates);
    showNotification(`Randomly picked: ${randomBook.title} by ${randomBook.author}`);
  }

  const handleDelete = (id: string) => {
    removeBook(id);
    showNotification("This is your next read")
  }

  return (
    <div className="p-6 bg-gradient-to-br from-accent/5 to-blush/5">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full shadow-lg">
          <span className="text-white text-sm">Up Next</span>
        </div>
      </div>

      <div
        className="bg-white rounded-3xl p-6 shadow-xl border-4 border-primary mb-6"
        role="region"
        aria-label="Next book to read"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div
            className="bg-accent w-32 h-44 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xl"
            aria-hidden="true"
          >
            {nextBook.coverUrl ? (
              <Image
                className="w-full h-full object-cover"
                src={nextBook.coverUrl}
                alt="Book cover"
                priority
                width={128}
                height={176}
              />
            ) : (
              <BookOpen className="w-16 h-16 text-white opacity-60" aria-hidden="true" />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl text-gray-900 mb-2">{nextBook.title}</h2>
            <p className="text-gray-600 mb-6">by {nextBook.author}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleDelete(nextBook.id)}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Start reading ${nextBook.title}`}
              >
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                Pick book
              </button>
              <button
                onClick={handleRandomPick}
                disabled={books.length <= 1}
                className="flex-1 px-6 py-3 bg-secondary text-white rounded-2xl hover:bg-secondary/90 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 transition-all shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                aria-label="Pick a random book from your queue to read next"
                aria-disabled={books.length <= 1}
              >
                <Shuffle className="w-5 h-5" aria-hidden="true" />
                Random Pick
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Pick randomly or start reading • Reorder your queue below
        </p>
      </div>
    </div>
  )
}

export default UpNext;