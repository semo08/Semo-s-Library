import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import { useBookStore } from '../stores/bookStore';
import { MyBook } from '../types';
import BookCard from '../components/BookCard';
import BookDetailScreen from './BookDetailScreen';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { stats, myBooks, loadStats, loadBooks } = useBookStore();
  const [selectedBook, setSelectedBook] = useState<MyBook | null>(null);

  useEffect(() => {
    loadStats();
    loadBooks('read');
  }, []);

  const recentBooks = myBooks.slice(0, 6);

  const handleCloseDetail = () => {
    setSelectedBook(null);
    loadStats();
    loadBooks('read');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 통계 카드 */}
      <View style={styles.statsGrid}>
        <View style={styles.statCardLarge}>
          <Text style={styles.statNumberLarge}>{stats?.totalReadCount ?? 0}</Text>
          <Text style={styles.statLabel}>총 읽은 책</Text>
        </View>
        <View style={styles.statsColumn}>
          <View style={styles.statCardSmall}>
            <Text style={styles.statNumberSmall}>{stats?.thisYearCount ?? 0}</Text>
            <Text style={styles.statLabel}>올해</Text>
          </View>
          <View style={styles.statCardSmall}>
            <Text style={styles.statNumberSmall}>{stats?.thisMonthCount ?? 0}</Text>
            <Text style={styles.statLabel}>이번달</Text>
          </View>
        </View>
        <View style={styles.statsColumn}>
          <View style={styles.statCardSmall}>
            <Text style={styles.statNumberSmall}>
              {stats?.averageRating ? `${stats.averageRating}` : '-'}
            </Text>
            <Text style={styles.statLabel}>평균별점</Text>
          </View>
          <View style={styles.statCardSmall}>
            <Text style={styles.statNumberSmall}>{stats?.wishlistCount ?? 0}</Text>
            <Text style={styles.statLabel}>위시리스트</Text>
          </View>
        </View>
      </View>

      {/* 검색 버튼 */}
      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search' as never)}
      >
        <Text style={styles.searchText}>책 검색하기</Text>
      </TouchableOpacity>

      {/* 최근 읽은 책 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 읽은 책</Text>
        {recentBooks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>아직 책이 없어요</Text>
            <Text style={styles.emptyDescription}>첫 번째 책을 추가해보세요!</Text>
          </View>
        ) : (
          <FlatList
            data={recentBooks}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.horizontalCard}>
                <BookCard
                  myBook={item}
                  onPress={() => setSelectedBook(item)}
                />
              </View>
            )}
          />
        )}
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    paddingBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  statCardLarge: {
    flex: 1.2,
    backgroundColor: colors.primary.terracotta,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsColumn: {
    flex: 1,
    gap: 10,
  },
  statCardSmall: {
    flex: 1,
    backgroundColor: colors.background.parchment,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumberLarge: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  statNumberSmall: {
    ...typography.subtitle,
    color: colors.primary.terracotta,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.latte,
    marginTop: 4,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.clay,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchText: {
    ...typography.button,
    color: colors.white,
  },
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.espresso,
    marginBottom: 14,
  },
  horizontalList: {
    gap: 10,
  },
  horizontalCard: {
    width: 140,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: colors.background.parchment,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.background.linen,
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    ...typography.bodyLarge,
    color: colors.text.espresso,
    fontWeight: '600',
  },
  emptyDescription: {
    ...typography.body,
    color: colors.text.coffee,
    marginTop: 8,
  },
});
