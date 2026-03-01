import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography } from '../constants';
import { CollectionType } from '../types';

export default function CollectionScreen() {
  const [activeTab, setActiveTab] = useState<CollectionType>('read');

  return (
    <View style={styles.container}>
      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'read' && styles.activeTab]}
          onPress={() => setActiveTab('read')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'read' && styles.activeTabText,
            ]}
          >
            읽은 책
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'wishlist' && styles.activeTab]}
          onPress={() => setActiveTab('wishlist')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'wishlist' && styles.activeTabText,
            ]}
          >
            읽고 싶은 책
          </Text>
        </TouchableOpacity>
      </View>

      {/* 컬렉션 내용 */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>
            {activeTab === 'read' ? '📖' : '💫'}
          </Text>
          <Text style={styles.emptyTitle}>
            {activeTab === 'read'
              ? '아직 읽은 책이 없어요'
              : '읽고 싶은 책이 없어요'}
          </Text>
          <Text style={styles.emptyDescription}>
            {activeTab === 'read'
              ? '책을 읽고 기록해보세요!\n별점과 한줄평을 남길 수 있어요'
              : '관심 있는 책을 저장해두세요!\n나중에 읽을 책 목록으로 활용할 수 있어요'}
          </Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
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
