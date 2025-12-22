'use server';

import { refresh } from 'next/cache';

import { createBook } from './data';

export async function addBook(
  prevState: { success: boolean | null },
  formData: FormData
) {
  const title = formData.get('title')?.toString();
  const author = formData.get('author')?.toString();
  const coverUrl = formData.get('coverUrl')?.toString();

  if (!title || !author) {
    return { success: false };
  }

  try {
    await createBook(title, author, coverUrl);
  } catch {
    return { success: false };
  }

  refresh();
  return { success: true };
}
