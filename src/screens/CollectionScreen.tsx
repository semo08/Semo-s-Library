import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { colors, typography } from '../constants';
import { CollectionType, MyBook } from '../types';
import { useBookStore } from '../stores/bookStore';
import BookCard, { CARD_GAP, NUM_COLUMNS } from '../components/BookCard';
import BookDetailScreen from './BookDetailScreen';

export default function CollectionScreen() {
  const [activeTab, setActiveTab] = useState<CollectionType>('read');
  const [selectedBook, setSelectedBook] = useState<MyBook | null>(null);

  const { myBooks, isLoading, loadBooks } = useBookStore();

  // 탭 변경 또는 화면 진입 시 책 목록 로드
  useEffect(() => {
    loadBooks(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: CollectionType) => {
    setActiveTab(tab);
  };

  const handleBookPress = (myBook: MyBook) => {
    setSelectedBook(myBook);
  };

  const handleCloseDetail = useCallback(() => {
    setSelectedBook(null);
    loadBooks(activeTab); // 변경사항 반영
  }, [activeTab]);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>
        {activeTab === 'read' ? '아직 읽은 책이 없어요' : '읽고 싶은 책이 없어요'}
      </Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'read'
          ? '책을 읽고 기록해보세요!\n별점과 한줄평을 남길 수 있어요'
          : '관심 있는 책을 저장해두세요!\n나중에 읽을 책 목록으로 활용할 수 있어요'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'read' && styles.activeTab]}
          onPress={() => handleTabChange('read')}
        >
          <Text style={[styles.tabText, activeTab === 'read' && styles.activeTabText]}>
            읽은 책
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'wishlist' && styles.activeTab]}
          onPress={() => handleTabChange('wishlist')}
        >
          <Text style={[styles.tabText, activeTab === 'wishlist' && styles.activeTabText]}>
            읽고 싶은 책
          </Text>
        </TouchableOpacity>
      </View>

      {/* 로딩 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.terracotta} />
        </View>
      ) : (
        <FlatList
          data={myBooks}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.row}
          contentContainerStyle={
            myBooks.length === 0
              ? styles.emptyContentContainer
              : styles.listContent
          }
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => (
            <BookCard
              myBook={item}
              onPress={() => handleBookPress(item)}
            />
          )}
        />
      )}

      {/* 책 상세 Modal */}
      <Modal
        visible={selectedBook !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseDetail}
      >
        {selectedBook && (
          <BookDetailScreen
            myBook={selectedBook}
            onClose={handleCloseDetail}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.background.parchment,
  },
  activeTab: {
    backgroundColor: colors.primary.terracotta,
  },
  tabText: {
    ...typography.button,
    color: colors.text.coffee,
  },
  activeTabText: {
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    gap: CARD_GAP,
  },
  row: {
    gap: CARD_GAP,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
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
