import postgres from 'postgres';

import { Book } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchBooks() {
  try {
    return await sql<Book[]>`
      SELECT id, title, author, "order", cover_url AS "coverUrl"
      FROM book
      ORDER BY book.order`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the list of books.');
  }
}

export async function createBook(
  title: string,
  author: string,
  coverUrl?: string
) {
  try {
    const result = await sql<Book[]>`
      INSERT INTO book (title, author, cover_url, "order")
      VALUES (
        ${title},
        ${author},
        ${coverUrl || null},
        (SELECT COALESCE(MAX("order"), 0) + 1 FROM book)
      )
      RETURNING *`;

    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create book.');
  }
}

export async function deleteBook(id: string) {
  try {
    await sql`
      DELETE FROM book
      WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete book.');
  }
}

export async function updateBookOrder(bookId: string, newOrder: number) {
  try {
    await sql`
      UPDATE book
      SET "order" = ${newOrder}
      WHERE id = ${bookId}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update book order.');
  }
}

export async function updateBooksOrder(books: { id: string; order: number }[]) {
  try {
    await sql.begin(async (sql) => {
      for (const book of books) {
        await sql`
          UPDATE book
          SET "order" = ${book.order}
          WHERE id = ${book.id}`;
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update books order.');
  }
}