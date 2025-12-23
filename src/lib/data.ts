import { Account, Profile } from 'next-auth';
import postgres from 'postgres';

import { auth } from './auth';
import { Book, UserId } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchBooks() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  try {
    return await sql<Book[]>`
      SELECT id, title, author, "order", cover_url AS "coverUrl"
      FROM book
      WHERE user_id = ${session.user.id}
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
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  try {
    const result = await sql<Book[]>`
      INSERT INTO book (user_id, title, author, cover_url, "order")
      VALUES (
        ${session.user.id},
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
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

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
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

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
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

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

export async function upsertUser(account: Account, profile: Profile) {
  const users = await sql<UserId[]>`
    INSERT INTO users (
      provider,
      provider_account_id,
      email,
      name
    )
    VALUES (
      ${account.provider},
      ${account.providerAccountId},
      ${profile.email!},
      ${profile.name ?? null}
    )
    ON CONFLICT (provider, provider_account_id)
    DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name
    RETURNING id
  `;

  return users[0].id;
}
