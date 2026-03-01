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
      query: query.trim(),
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
      const errorText = await response.text();
      console.error('[Naver API] Error response:', response.status, errorText);

      if (response.status === 429) {
        throw new Error('검색 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
      } else if (response.status === 401) {
        throw new Error('API 인증에 실패했습니다.');
      } else {
        throw new Error(`검색 실패 (${response.status})`);
      }
    }

    const data: NaverBookSearchResponse = await response.json();

    return {
      books: data.items.map(convertToBook),
      total: data.total,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('[Naver API] 책 검색 오류:', error.message);
      throw error;
    }
    console.error('[Naver API] 책 검색 알 수 없는 오류:', error);
    throw new Error('책 검색 중 오류가 발생했습니다.');
  }
};

// ISBN으로 책 상세 정보 가져오기
export const getBookByIsbn = async (isbn: string): Promise<Book | null> => {
  if (!isbn.trim()) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      query: isbn.trim(),
      d_isbn: isbn.trim(),
    });

    const response = await fetch(`${NAVER_BOOK_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Naver API] Error response:', response.status, errorText);

      if (response.status === 401) {
        throw new Error('API 인증에 실패했습니다.');
      }
      throw new Error(`책 조회 실패 (${response.status})`);
    }

    const data: NaverBookSearchResponse = await response.json();

    if (data.items.length === 0) {
      return null;
    }

    return convertToBook(data.items[0]);
  } catch (error) {
    if (error instanceof Error) {
      console.error('[Naver API] 책 상세 조회 오류:', error.message);
      throw error;
    }
    console.error('[Naver API] 책 상세 조회 알 수 없는 오류:', error);
    throw new Error('책 조회 중 오류가 발생했습니다.');
  }
};
