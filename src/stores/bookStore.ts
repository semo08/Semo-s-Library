import { create } from 'zustand';
import { Book, MyBook, CollectionType } from '../types';

interface BookState {
  // 검색 결과
  searchResults: Book[];
  searchQuery: string;
  isSearching: boolean;

  // 내 컬렉션
  myBooks: MyBook[];

  // 액션
  setSearchResults: (books: Book[]) => void;
  setSearchQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setMyBooks: (books: MyBook[]) => void;
  addToCollection: (book: Book, type: CollectionType) => void;
  removeFromCollection: (bookId: string) => void;
  updateMyBook: (bookId: string, updates: Partial<MyBook>) => void;
}

export const useBookStore = create<BookState>((set, get) => ({
  // 초기 상태
  searchResults: [],
  searchQuery: '',
  isSearching: false,
  myBooks: [],

  // 검색 관련
  setSearchResults: (books) => set({ searchResults: books }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearching: (isSearching) => set({ isSearching }),

  // 컬렉션 관련
  setMyBooks: (books) => set({ myBooks: books }),

  addToCollection: (book, type) => {
    const { myBooks } = get();
    const now = new Date().toISOString();

    const newMyBook: MyBook = {
      id: `${book.id}_${Date.now()}`,
      bookId: book.id,
      book,
      collectionType: type,
      rating: null,
      review: null,
      readDate: null,
      createdAt: now,
      updatedAt: now,
    };

    set({ myBooks: [...myBooks, newMyBook] });
  },

  removeFromCollection: (bookId) => {
    const { myBooks } = get();
    set({ myBooks: myBooks.filter((b) => b.bookId !== bookId) });
  },

  updateMyBook: (bookId, updates) => {
    const { myBooks } = get();
    set({
      myBooks: myBooks.map((b) =>
        b.bookId === bookId
          ? { ...b, ...updates, updatedAt: new Date().toISOString() }
          : b
      ),
    });
  },
}));
