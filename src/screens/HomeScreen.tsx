import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography } from '../constants';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 통계 카드 */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>읽은 책</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>올해 읽은 책</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>읽고 싶은 책</Text>
        </View>
      </View>

      {/* 검색 버튼 */}
      <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>책 검색하기</Text>
      </TouchableOpacity>

      {/* 책장 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 책장</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>아직 책이 없어요</Text>
          <Text style={styles.emptyDescription}>
            첫 번째 책을 추가해보세요!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.parchment,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.title,
    color: colors.primary.terracotta,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.coffee,
    marginTop: 4,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.maple,
    marginHorizontal: 16,
    marginVertical: 8,
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
    padding: 16,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.primary.terracotta,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: colors.background.parchment,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.text.latte,
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
