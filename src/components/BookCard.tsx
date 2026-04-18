import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, typography } from '../constants';
import { MyBook } from '../types';

const CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;
const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

interface Props {
  myBook: MyBook;
  onPress: () => void;
}

export default function BookCard({ myBook, onPress }: Props) {
  const { book, rating } = myBook;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* 책 표지 */}
      {book.coverUrl ? (
        <Image source={{ uri: book.coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverPlaceholderText}>No Cover</Text>
        </View>
      )}

      {/* 책 정보 */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>

        {/* 별점 */}
        {rating !== null && (
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{rating}.0</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export { CARD_WIDTH, CARD_GAP, NUM_COLUMNS };

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.background.parchment,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cover: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    backgroundColor: colors.background.linen,
  },
  coverPlaceholder: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    backgroundColor: colors.background.linen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholderText: {
    fontSize: 36,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  title: {
    ...typography.bookTitle,
    fontSize: 13,
    color: colors.text.espresso,
  },
  author: {
    ...typography.bookAuthor,
    color: colors.text.latte,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  star: {
    fontSize: 12,
    color: colors.accent.gold,
  },
  rating: {
    ...typography.caption,
    color: colors.text.coffee,
  },
});
