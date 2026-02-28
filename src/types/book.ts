// 네이버 API에서 가져온 책 정보
export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  coverUrl: string;
  description: string;
  isbn: string;
}

// 내 컬렉션에 저장된 책
export interface MyBook {
  id: string;
  bookId: string;
  book: Book;
  collectionType: CollectionType;
  rating: number | null; // 0.5 ~ 5.0 (반점 단위)
  review: string | null; // 50자 한줄평
  readDate: string | null; // ISO 날짜 문자열
  createdAt: string;
  updatedAt: string;
}

export type CollectionType = 'read' | 'wishlist';

// 네이버 책 API 응답 타입
export interface NaverBookSearchResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NaverBookItem[];
}

export interface NaverBookItem {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

// Book으로 변환하는 유틸 함수 타입
export type NaverBookToBook = (item: NaverBookItem) => Book;
