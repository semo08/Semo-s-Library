import * as SQLite from 'expo-sqlite';
import { Book, MyBook, CollectionType } from '../types';

const DATABASE_NAME = 'semos_library.db';

let db: SQLite.SQLiteDatabase | null = null;

// 데이터베이스 초기화
export const initDatabase = async (): Promise<void> => {
  db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  // 책 테이블
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT,
      publisher TEXT,
      publishDate TEXT,
      coverUrl TEXT,
      description TEXT,
      isbn TEXT
    );
  `);

  // 내 컬렉션 테이블
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS my_books (
      id TEXT PRIMARY KEY,
      bookId TEXT NOT NULL,
      collectionType TEXT NOT NULL,
      rating REAL,
      review TEXT,
      readDate TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (bookId) REFERENCES books (id)
    );
  `);
};

// 책 저장
export const saveBook = async (book: Book): Promise<void> => {
  if (!db) throw new Error('Database not initialized');

  await db.runAsync(
    `INSERT OR REPLACE INTO books (id, title, author, publisher, publishDate, coverUrl, description, isbn)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      book.id,
      book.title,
      book.author,
      book.publisher,
      book.publishDate,
      book.coverUrl,
      book.description,
      book.isbn,
    ]
  );
};

// 내 컬렉션에 추가
export const addToMyBooks = async (
  book: Book,
  collectionType: CollectionType
): Promise<MyBook> => {
  if (!db) throw new Error('Database not initialized');

  // 먼저 책 정보 저장
  await saveBook(book);

  const now = new Date().toISOString();
  const id = `${book.id}_${Date.now()}`;

  await db.runAsync(
    `INSERT INTO my_books (id, bookId, collectionType, rating, review, readDate, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, book.id, collectionType, null, null, null, now, now]
  );

  return {
    id,
    bookId: book.id,
    book,
    collectionType,
    rating: null,
    review: null,
    readDate: null,
    createdAt: now,
    updatedAt: now,
  };
};

// 내 컬렉션 가져오기
export const getMyBooks = async (
  collectionType?: CollectionType
): Promise<MyBook[]> => {
  if (!db) throw new Error('Database not initialized');

  let query = `
    SELECT mb.*, b.title, b.author, b.publisher, b.publishDate, b.coverUrl, b.description, b.isbn
    FROM my_books mb
    JOIN books b ON mb.bookId = b.id
  `;

  if (collectionType) {
    query += ` WHERE mb.collectionType = ?`;
  }

  query += ` ORDER BY mb.createdAt DESC`;

  const rows = collectionType
    ? await db.getAllAsync(query, [collectionType])
    : await db.getAllAsync(query);

  return (rows as any[]).map((row) => ({
    id: row.id,
    bookId: row.bookId,
    book: {
      id: row.bookId,
      title: row.title,
      author: row.author,
      publisher: row.publisher,
      publishDate: row.publishDate,
      coverUrl: row.coverUrl,
      description: row.description,
      isbn: row.isbn,
    },
    collectionType: row.collectionType as CollectionType,
    rating: row.rating,
    review: row.review,
    readDate: row.readDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));
};

// 내 책 업데이트 (평점, 리뷰, 읽은 날짜)
export const updateMyBook = async (
  id: string,
  updates: Partial<Pick<MyBook, 'rating' | 'review' | 'readDate' | 'collectionType'>>
): Promise<void> => {
  if (!db) throw new Error('Database not initialized');

  const fields: string[] = [];
  const values: any[] = [];

  if (updates.rating !== undefined) {
    fields.push('rating = ?');
    values.push(updates.rating);
  }
  if (updates.review !== undefined) {
    fields.push('review = ?');
    values.push(updates.review);
  }
  if (updates.readDate !== undefined) {
    fields.push('readDate = ?');
    values.push(updates.readDate);
  }
  if (updates.collectionType !== undefined) {
    fields.push('collectionType = ?');
    values.push(updates.collectionType);
  }

  fields.push('updatedAt = ?');
  values.push(new Date().toISOString());
  values.push(id);

  await db.runAsync(
    `UPDATE my_books SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
};

// 내 컬렉션에서 삭제
export const removeFromMyBooks = async (id: string): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  await db.runAsync('DELETE FROM my_books WHERE id = ?', [id]);
};

// 읽은 책 통계
export const getReadBooksStats = async (): Promise<{
  totalCount: number;
  thisYearCount: number;
}> => {
  if (!db) throw new Error('Database not initialized');

  const currentYear = new Date().getFullYear();

  const totalResult = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM my_books WHERE collectionType = 'read'`
  );

  const thisYearResult = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM my_books
     WHERE collectionType = 'read'
     AND strftime('%Y', createdAt) = ?`,
    [String(currentYear)]
  );

  return {
    totalCount: totalResult?.count ?? 0,
    thisYearCount: thisYearResult?.count ?? 0,
  };
};
