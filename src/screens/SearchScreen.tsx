import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors, typography } from '../constants';
import { useBookStore } from '../stores/bookStore';
import { Book, CollectionType } from '../types';
import BookListItem from '../components/BookListItem';
import QuickAddSheet from '../components/QuickAddSheet';

// 디바운스 훅
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const {
    searchResults,
    isSearching,
    searchBooks,
    addBook,
  } = useBookStore();

  // 디바운스된 검색어 (300ms)
  const debouncedQuery = useDebounce(query, 300);

  // 검색 실행
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleSearch = async (searchQuery: string) => {
    try {
      await searchBooks(searchQuery);
    } catch (error) {
      Alert.alert('검색 실패', '책 검색 중 오류가 발생했습니다.');
    }
  };

  // 빠른 추가 버튼
  const handleQuickAdd = (book: Book) => {
    setSelectedBook(book);
    setIsSheetVisible(true);
  };

  // 컬렉션 타입 선택
  const handleSelectType = async (type: CollectionType) => {
    if (!selectedBook) return;

    try {
      await addBook(selectedBook, type);

      const message = type === 'read'
        ? '읽은 책에 추가되었습니다'
        : '읽고 싶은 책에 추가되었습니다';

      Alert.alert('추가 완료', message);
    } catch (error) {
      Alert.alert('추가 실패', '책을 추가하는 중 오류가 발생했습니다.');
    }
  };

  // 검색 결과 렌더링
  const renderBookItem = ({ item }: { item: Book }) => (
    <BookListItem
      book={item}
      onQuickAdd={() => handleQuickAdd(item)}
    />
  );

  // 빈 상태 렌더링
  const renderEmptyState = () => {
    if (isSearching) {
      return null;
    }

    if (!query.trim()) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📖</Text>
          <Text style={styles.emptyTitle}>책을 검색해보세요</Text>
          <Text style={styles.emptyDescription}>
            읽은 책이나 읽고 싶은 책을{'\n'}검색해서 내 서재에 추가할 수 있어요
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>검색 결과가 없어요</Text>
        <Text style={styles.emptyDescription}>
          다른 키워드로 검색해보세요
        </Text>
      </View>
    );
  };

  // 리스트 헤더 (로딩 표시)
  const renderListHeader = () => {
    if (isSearching) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.terracotta} />
          <Text style={styles.loadingText}>검색 중...</Text>
        </View>
      );
    }

    if (searchResults.length > 0 && query.trim()) {
      return (
        <View style={styles.resultHeader}>
          <Text style={styles.resultCount}>
            검색 결과 {searchResults.length}건
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* 검색 입력 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="책 제목, 저자, ISBN으로 검색"
            placeholderTextColor={colors.text.latte}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 검색 결과 또는 빈 상태 */}
      <FlatList
        data={searchResults}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          searchResults.length === 0 ? styles.emptyListContent : undefined
        }
        keyboardShouldPersistTaps="handled"
      />

      {/* 빠른 추가 바텀시트 */}
      <QuickAddSheet
        visible={isSheetVisible}
        book={selectedBook}
        onClose={() => setIsSheetVisible(false)}
        onSelect={handleSelectType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.background.parchment,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.text.latte,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text.espresso,
    padding: 0,
  },
  clearButton: {
    fontSize: 16,
    color: colors.text.latte,
    paddingLeft: 8,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.text.coffee,
    marginTop: 16,
  },
  resultHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background.cream,
  },
  resultCount: {
    ...typography.caption,
    color: colors.text.coffee,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyTitle: {
    ...typography.subtitle,
    color: colors.text.espresso,
    marginBottom: 12,
  },
  emptyDescription: {
    ...typography.body,
    color: colors.text.coffee,
    textAlign: 'center',
    lineHeight: 22,
  },
});
