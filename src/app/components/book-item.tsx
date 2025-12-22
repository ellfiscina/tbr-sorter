'use client';

import { useRef } from "react";

import Image from "next/image";

import { BookOpen, GripVertical, Trash2 } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";

import { Book } from "@/lib/types";

import type { Identifier } from 'dnd-core';

interface BookItemProps {
  book: Book;
  index: number;
  totalBooks: number;
}

interface DragItem {
  index: number;
  type: 'book';
}

const BookItem = ({ book, index, totalBooks } : BookItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const moveBook = (dragIndex: number, hoverIndex: number) => {}

  const handleDeleteBook = (id: string) => {}

  const [{ handlerId }, drop] = useDrop<
  DragItem,
  void,
  { handlerId: Identifier | null }
>({
  accept: 'book',

  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    };
  },

  hover(item, monitor) {
    if (!ref.current) {
      return;
    }

    const dragIndex = item.index;
    const hoverIndex = index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();
    if (!clientOffset) return;

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    moveBook(dragIndex, hoverIndex);
    item.index = hoverIndex;
  },
});

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'book',
    item: () => {
      return { id: book.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));
  drag(dragRef);

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`bg-white rounded-2xl shadow-md hover:shadow-lg mb-3 flex items-center p-4 transition-all focus-within:ring-2 focus-within:ring-primary ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      role="listitem"
      aria-label={`${book.title} by ${book.author}, position ${index + 1} of ${totalBooks}`}
    >
      <div
        ref={dragRef}
        className="mr-3 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
        role="img"
      >
        <GripVertical className="w-5 h-5 text-blush" aria-hidden="true" />
      </div>

      <div
        className="w-12 h-16 rounded-lg mr-3 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm bg-primary"
        aria-hidden="true"
      >
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt="Book cover"
            className="w-full h-full object-cover"
            width={48}
            height={64}
          />
        ) : (
          <BookOpen className="w-6 h-6 text-white opacity-60" aria-hidden="true" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-gray-900 truncate">{book.title}</div>
        <div className="text-sm text-gray-500 truncate">{book.author}</div>
      </div>

      <button
        onClick={() => handleDeleteBook(book.id)}
        className="ml-3 p-2 -mr-1 rounded-full hover:bg-red-50 active:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
        aria-label={`Delete ${book.title} by ${book.author} from reading list`}
      >
        <Trash2 className="w-5 h-5 text-secondary" aria-hidden="true" />
      </button>
    </div>
  );
}

export default BookItem;