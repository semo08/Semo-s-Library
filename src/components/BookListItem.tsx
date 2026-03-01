import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Book } from '../types';
import { colors, typography } from '../constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface BookListItemProps {
  book: Book;
  onPress?: () => void;
  onQuickAdd?: () => void;
}

export default function BookListItem({
  book,
  onPress,
  onQuickAdd,
}: BookListItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* 책 표지 이미지 */}
        <View style={styles.coverContainer}>
          {book.coverUrl ? (
            <Image
              source={{ uri: book.coverUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.coverImage, styles.noCover]}>
              <Text style={styles.noCoverText}>📖</Text>
            </View>
          )}
        </View>

        {/* 책 정보 */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
          <View style={styles.publishInfo}>
            <Text style={styles.publisher} numberOfLines={1}>
              {book.publisher}
            </Text>
            {book.publishDate && (
              <>
                <Text style={styles.separator}>·</Text>
                <Text style={styles.publishDate}>
                  {formatPublishDate(book.publishDate)}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* 빠른 추가 버튼 */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            onQuickAdd?.();
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// 날짜 포맷팅 (YYYYMMDD -> YYYY.MM)
function formatPublishDate(dateStr: string): string {
  if (dateStr.length === 8) {
    return `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}`;
  }
  return dateStr;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.linen,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    minHeight: 120, // 터치 타겟 최소 높이 확보
  },
  coverContainer: {
    marginRight: 16,
  },
  coverImage: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: colors.background.parchment,
  },
  noCover: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoverText: {
    fontSize: 32,
    opacity: 0.3,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.subtitle,
    fontSize: 16,
    color: colors.neutral.charcoal,
    marginBottom: 6,
    lineHeight: 22,
  },
  author: {
    ...typography.body,
    fontSize: 14,
    color: colors.neutral.coffee,
    marginBottom: 4,
  },
  publishInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  publisher: {
    ...typography.caption,
    color: colors.neutral.sand,
    flex: 0,
    maxWidth: SCREEN_WIDTH * 0.4,
  },
  separator: {
    ...typography.caption,
    color: colors.neutral.sand,
    marginHorizontal: 6,
  },
  publishDate: {
    ...typography.caption,
    color: colors.neutral.sand,
  },
  addButton: {
    width: 44, // 터치 타겟 최소 크기
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.walnut,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addButtonText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
    lineHeight: 24,
  },
});
