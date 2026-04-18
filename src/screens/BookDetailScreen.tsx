import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, typography } from '../constants';
import { MyBook, CollectionType } from '../types';
import { useBookStore } from '../stores/bookStore';

interface Props {
  myBook: MyBook;
  onClose: () => void;
}

const COLLECTION_LABELS: Record<CollectionType, string> = {
  read: '읽은 책',
  wishlist: '읽고 싶은 책',
};

const STARS = [1, 2, 3, 4, 5];

export default function BookDetailScreen({ myBook, onClose }: Props) {
  const { updateBook, removeBook } = useBookStore();

  const [rating, setRating] = useState<number | null>(myBook.rating);
  const [review, setReview] = useState<string>(myBook.review ?? '');
  const [readDate, setReadDate] = useState<string>(
    myBook.readDate ? myBook.readDate.slice(0, 10) : ''
  );
  const [collectionType, setCollectionType] = useState<CollectionType>(
    myBook.collectionType
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBook(myBook.id, {
        rating,
        review: review.trim() || null,
        readDate: readDate || null,
        collectionType,
      });
      Alert.alert('저장 완료', '수정사항이 저장됐어요!');
      onClose();
    } catch {
      Alert.alert('오류', '저장에 실패했어요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('삭제', '이 책을 서재에서 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeBook(myBook.id);
            onClose();
          } catch {
            Alert.alert('오류', '삭제에 실패했어요.');
          }
        },
      },
    ]);
  };

  const handleTodayDate = () => {
    const today = new Date().toISOString().slice(0, 10);
    setReadDate(today);
  };

  const { book } = myBook;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 책 표지 + 기본 정보 */}
      <View style={styles.bookHeader}>
        {book.coverUrl ? (
          <Image source={{ uri: book.coverUrl }} style={styles.cover} />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverPlaceholderText}>No Cover</Text>
          </View>
        )}
        <View style={styles.bookInfo}>
          <Text style={styles.title} numberOfLines={3}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.publisher}>{book.publisher}</Text>
          {book.price && (
            <Text style={styles.price}>
              {book.price.toLocaleString()}원
            </Text>
          )}
        </View>
      </View>

      {/* 컬렉션 타입 */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>분류</Text>
        <View style={styles.typeRow}>
          {(Object.keys(COLLECTION_LABELS) as CollectionType[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                collectionType === type && styles.typeButtonActive,
              ]}
              onPress={() => setCollectionType(type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  collectionType === type && styles.typeButtonTextActive,
                ]}
              >
                {COLLECTION_LABELS[type]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 별점 */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>별점</Text>
        <View style={styles.starRow}>
          {STARS.map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(rating === star ? null : star)}
            >
              <Text style={styles.star}>
                {rating !== null && rating >= star ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
          {rating !== null && (
            <Text style={styles.ratingText}>{rating}.0</Text>
          )}
        </View>
      </View>

      {/* 한줄평 */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>한줄평</Text>
        <TextInput
          style={styles.reviewInput}
          value={review}
          onChangeText={(text) => {
            if (text.length <= 50) setReview(text);
          }}
          placeholder="50자 이내로 남겨보세요"
          placeholderTextColor={colors.text.latte}
          multiline
        />
        <Text style={styles.charCount}>{review.length}/50</Text>
      </View>

      {/* 읽은 날짜 */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>읽은 날짜</Text>
        <View style={styles.dateRow}>
          <TextInput
            style={styles.dateInput}
            value={readDate}
            onChangeText={setReadDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.text.latte}
            maxLength={10}
          />
          <TouchableOpacity style={styles.todayButton} onPress={handleTodayDate}>
            <Text style={styles.todayButtonText}>오늘</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity
        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? '저장 중...' : '저장'}
        </Text>
      </TouchableOpacity>

      {/* 삭제 버튼 */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>서재에서 삭제</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  bookHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  cover: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.background.linen,
  },
  coverPlaceholder: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.background.linen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholderText: {
    fontSize: 36,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    ...typography.bookTitle,
    color: colors.text.espresso,
  },
  author: {
    ...typography.bookAuthor,
    color: colors.text.coffee,
  },
  publisher: {
    ...typography.caption,
    color: colors.text.latte,
  },
  price: {
    ...typography.label,
    color: colors.primary.terracotta,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.text.espresso,
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.background.parchment,
    borderWidth: 1,
    borderColor: colors.background.linen,
  },
  typeButtonActive: {
    backgroundColor: colors.primary.terracotta,
    borderColor: colors.primary.terracotta,
  },
  typeButtonText: {
    ...typography.buttonSmall,
    color: colors.text.coffee,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  star: {
    fontSize: 32,
    color: colors.accent.gold,
  },
  ratingText: {
    ...typography.body,
    color: colors.text.coffee,
    marginLeft: 8,
  },
  reviewInput: {
    backgroundColor: colors.background.parchment,
    borderRadius: 10,
    padding: 14,
    minHeight: 80,
    ...typography.body,
    color: colors.text.espresso,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.background.linen,
  },
  charCount: {
    ...typography.caption,
    color: colors.text.latte,
    textAlign: 'right',
    marginTop: 6,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    backgroundColor: colors.background.parchment,
    borderRadius: 10,
    padding: 14,
    ...typography.body,
    color: colors.text.espresso,
    borderWidth: 1,
    borderColor: colors.background.linen,
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.background.linen,
    borderRadius: 10,
  },
  todayButtonText: {
    ...typography.buttonSmall,
    color: colors.text.coffee,
  },
  saveButton: {
    backgroundColor: colors.primary.terracotta,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
  },
  deleteButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    ...typography.button,
    color: colors.semantic.error,
  },
});
