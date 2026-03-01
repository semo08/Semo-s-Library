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
  price: number | null; // 정가 (원)
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
  lastBuildDate: string; // 검색 결과 생성 시간 ("Mon, 01 Mar 2026 10:00:00 +0900")
  total: number;
  start: number; // 현재 페이지 시작 위치 (1부터 시작)
  display: number; // 한 페이지에 보여줄 개수 (기본 10, 최대 100)
  items: NaverBookItem[];
}

export interface NaverBookItem {
  title: string;
  link: string;
  image: string;
  author: string;
  price: string;    // 정가
  discount: string; // 판매가
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

// Book으로 변환하는 유틸 함수 타입
export type NaverBookToBook = (item: NaverBookItem) => Book;
