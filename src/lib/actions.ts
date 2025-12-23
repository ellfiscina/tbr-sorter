'use server';

import { refresh } from 'next/cache';

import { createBook, deleteBook, updateBooksOrder } from './data';

export async function addBook(
  prevState: { success: boolean | null },
  formData: FormData
) {
  const title = formData.get('title')?.toString();
  const author = formData.get('author')?.toString();
  const isbn = formData.get('isbn')?.toString();

  if (!title || !author) {
    return { success: false };
  }

  try {
    await createBook(title, author, isbn);
  } catch {
    return { success: false };
  }

  refresh();
  return { success: true };
}

export async function removeBook(id: string) {
  await deleteBook(id);
  refresh()
}

export async function reorderBooks(books: { id: string; order: number }[]) {
  await updateBooksOrder(books);
  refresh()
}
