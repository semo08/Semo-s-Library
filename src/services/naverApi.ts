import { Book, NaverBookSearchResponse, NaverBookItem } from '../types';

// 네이버 API 설정
const NAVER_CLIENT_ID = '0JKqzcfvixVm8o3b7fCo';
const NAVER_CLIENT_SECRET = 'YOLZH0LWS5';

const NAVER_BOOK_API_URL = 'https://openapi.naver.com/v1/search/book.json';

// 네이버 책 아이템을 앱의 Book 타입으로 변환
const convertToBook = (item: NaverBookItem): Book => {
  // HTML 태그 제거
  const cleanText = (text: string) => text.replace(/<[^>]*>/g, '');

  return {
    id: item.isbn || `naver_${Date.now()}`,
    title: cleanText(item.title),
    author: cleanText(item.author),
    publisher: item.publisher,
    publishDate: item.pubdate,
    coverUrl: item.image,
    description: cleanText(item.description),
    isbn: item.isbn,
  };
};

// 책 검색
export const searchBooks = async (
  query: string,
  start: number = 1,
  display: number = 20
): Promise<{ books: Book[]; total: number }> => {
  if (!query.trim()) {
    return { books: [], total: 0 };
  }

  try {
    const params = new URLSearchParams({
      query: query,
      start: String(start),
      display: String(display),
    });

    const response = await fetch(`${NAVER_BOOK_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: NaverBookSearchResponse = await response.json();

    return {
      books: data.items.map(convertToBook),
      total: data.total,
    };
  } catch (error) {
    console.error('책 검색 오류:', error);
    throw error;
  }
};

// ISBN으로 책 상세 정보 가져오기
export const getBookByIsbn = async (isbn: string): Promise<Book | null> => {
  try {
    const params = new URLSearchParams({
      query: isbn,
      d_isbn: isbn,
    });

    const response = await fetch(`${NAVER_BOOK_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: NaverBookSearchResponse = await response.json();

    if (data.items.length === 0) {
      return null;
    }

    return convertToBook(data.items[0]);
  } catch (error) {
    console.error('책 상세 조회 오류:', error);
    throw error;
  }
};
