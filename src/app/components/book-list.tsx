'use client';

import { useCallback, useEffect, useState } from 'react';

import { reorderBooks } from '@/lib/actions';
import { Book } from '@/lib/types';

import BookItem from './book-item';

const BookList = ({ initialBooks }: { initialBooks: Book[] }) => {
  const [books, setBooks] = useState(initialBooks);

  const [pendingReorder, setPendingReorder] = useState<{
    dragIndex: number;
    hoverIndex: number;
  } | null>(null);

  useEffect(() => {
    if (!pendingReorder) return;

    const { dragIndex, hoverIndex } = pendingReorder;

    const start = Math.min(dragIndex, hoverIndex);
    const end = Math.max(dragIndex, hoverIndex);

    const updates = books.slice(start, end + 1).map((book, i) => ({
      ...book,
      order: start + i,
    }));

    reorderBooks(updates);

    setPendingReorder(null);
  }, [pendingReorder, books]);

  const moveBook = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setBooks(prevBooks => {
        const nextBooks = [...prevBooks];

        const [dragged] = nextBooks.splice(dragIndex, 1);
        nextBooks.splice(hoverIndex, 0, dragged);

        return nextBooks;
      });

      setPendingReorder({ dragIndex, hoverIndex });
    },[]);

  return (
    <div className="space-y-3" role="list" aria-label="Reading queue">
      {books.map((book, index) => (
        <BookItem
          key={book.id}
          book={book}
          index={index}
          totalBooks={books.length}
          moveBook={moveBook}
        />
      ))}
    </div>
  );
};

export default BookList;