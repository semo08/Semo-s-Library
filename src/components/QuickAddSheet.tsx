import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Book, CollectionType } from '../types';
import { colors, typography } from '../constants';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface QuickAddSheetProps {
  visible: boolean;
  book: Book | null;
  onClose: () => void;
  onSelect: (type: CollectionType) => void;
}

export default function QuickAddSheet({
  visible,
  book,
  onClose,
  onSelect,
}: QuickAddSheetProps) {
  if (!book) return null;

  const handleSelect = (type: CollectionType) => {
    onSelect(type);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              {/* 헤더 */}
              <View style={styles.header}>
                <View style={styles.handle} />
                <Text style={styles.title} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                  {book.author}
                </Text>
              </View>

              {/* 선택 버튼 */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.readButton]}
                  onPress={() => handleSelect('read')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonIcon}>✓</Text>
                  <Text style={styles.buttonText}>읽은 책</Text>
                  <Text style={styles.buttonDescription}>
                    별점과 리뷰를 남길 수 있어요
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.wishlistButton]}
                  onPress={() => handleSelect('wishlist')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonIcon}>♡</Text>
                  <Text style={styles.buttonText}>읽고 싶은 책</Text>
                  <Text style={styles.buttonDescription}>
                    나중에 읽을 책을 저장해요
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 취소 버튼 */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.background.linen,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral.sand,
    borderRadius: 2,
    marginBottom: 20,
  },
  title: {
    ...typography.subtitle,
    fontSize: 18,
    color: colors.neutral.charcoal,
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    ...typography.body,
    color: colors.neutral.coffee,
    textAlign: 'center',
  },
  buttons: {
    padding: 24,
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 120, // 터치 타겟 충분한 높이
  },
  readButton: {
    backgroundColor: colors.primary.walnut,
  },
  wishlistButton: {
    backgroundColor: colors.accent.forest,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  buttonText: {
    ...typography.subtitle,
    fontSize: 18,
    color: colors.white,
    marginBottom: 6,
  },
  buttonDescription: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  cancelButton: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.sand,
    minHeight: 52, // 터치 타겟
  },
  cancelButtonText: {
    ...typography.body,
    color: colors.neutral.coffee,
    fontWeight: '600',
  },
});
