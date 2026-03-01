import { create } from 'zustand';
import { Book, MyBook, CollectionType } from '../types';
import {
  getMyBooks,
  addToMyBooks,
  updateMyBook as dbUpdateMyBook,
  removeFromMyBooks,
  getHomeStats,
} from '../services/database';
import { searchBooks as apiSearchBooks } from '../services/naverApi';

interface BookStats {
  totalReadCount: number;
  thisYearCount: number;
  thisMonthCount: number;
  averageRating: number;
  wishlistCount: number;
}

interface BookState {
  // 검색 결과
  searchResults: Book[];
  searchQuery: string;
  isSearching: boolean;

  // 내 컬렉션
  myBooks: MyBook[];
  isLoading: boolean;

  // 통계
  stats: BookStats | null;

  // 액션
  setSearchResults: (books: Book[]) => void;
  setSearchQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  searchBooks: (query: string) => Promise<void>;

  // DB 연동 액션
  loadBooks: (collectionType?: CollectionType) => Promise<void>;
  loadStats: () => Promise<void>;
  addBook: (book: Book, type: CollectionType) => Promise<void>;
  updateBook: (id: string, updates: Partial<Pick<MyBook, 'rating' | 'review' | 'readDate' | 'collectionType'>>) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
}

export const useBookStore = create<BookState>((set, get) => ({
  // 초기 상태
  searchResults: [],
  searchQuery: '',
  isSearching: false,
  myBooks: [],
  isLoading: false,
  stats: null,

  // 검색 관련
  setSearchResults: (books) => set({ searchResults: books }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearching: (isSearching) => set({ isSearching }),

  // 네이버 API 책 검색
  searchBooks: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: query });
      return;
    }

    set({ isSearching: true, searchQuery: query });
    try {
      const { books } = await apiSearchBooks(query);
      set({ searchResults: books });
    } catch (error) {
      console.error('[Store] Failed to search books:', error);
      set({ searchResults: [] });
      throw error;
    } finally {
      set({ isSearching: false });
    }
  },

  // DB에서 책 목록 로드
  loadBooks: async (collectionType?: CollectionType) => {
    set({ isLoading: true });
    try {
      const books = await getMyBooks(collectionType);
      set({ myBooks: books });
    } catch (error) {
      console.error('[Store] Failed to load books:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 통계 로드
  loadStats: async () => {
    try {
      const stats = await getHomeStats();
      set({ stats });
    } catch (error) {
      console.error('[Store] Failed to load stats:', error);
      throw error;
    }
  },

  // 책 추가 (DB + 상태 업데이트)
  addBook: async (book, type) => {
    try {
      const newMyBook = await addToMyBooks(book, type);
      const { myBooks } = get();
      set({ myBooks: [newMyBook, ...myBooks] });

      // 통계 갱신
      await get().loadStats();
    } catch (error) {
      console.error('[Store] Failed to add book:', error);
      throw error;
    }
  },

  // 책 정보 수정 (별점, 리뷰, 읽은 날짜, 컬렉션 타입)
  updateBook: async (id, updates) => {
    try {
      await dbUpdateMyBook(id, updates);

      const { myBooks } = get();
      set({
        myBooks: myBooks.map((b) =>
          b.id === id
            ? { ...b, ...updates, updatedAt: new Date().toISOString() }
            : b
        ),
      });

      // 통계 갱신
      await get().loadStats();
    } catch (error) {
      console.error('[Store] Failed to update book:', error);
      throw error;
    }
  },

  // 책 삭제
  removeBook: async (id) => {
    try {
      await removeFromMyBooks(id);

      const { myBooks } = get();
      set({ myBooks: myBooks.filter((b) => b.id !== id) });

      // 통계 갱신
      await get().loadStats();
    } catch (error) {
      console.error('[Store] Failed to remove book:', error);
      throw error;
    }
  },
}));
