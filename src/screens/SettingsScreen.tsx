import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { colors, typography } from '../constants';
import { useThemeStore } from '../stores/themeStore';

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* 화면 설정 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.textMutedDark]}>
          화면
        </Text>
        <View style={[styles.settingItem, isDarkMode && styles.settingItemDark]}>
          <View style={styles.settingInfo}>
            <View>
              <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
                다크 모드
              </Text>
              <Text style={[styles.settingDescription, isDarkMode && styles.textMutedDark]}>
                어두운 테마를 사용합니다
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{
              false: colors.text.latte,
              true: colors.primary.clay,
            }}
            thumbColor={isDarkMode ? colors.primary.terracotta : colors.white}
          />
        </View>
      </View>

      {/* 계정 설정 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.textMutedDark]}>
          계정
        </Text>
        <TouchableOpacity style={[styles.settingItem, isDarkMode && styles.settingItemDark]}>
          <View style={styles.settingInfo}>
            <View>
              <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
                클라우드 동기화
              </Text>
              <Text style={[styles.settingDescription, isDarkMode && styles.textMutedDark]}>
                준비 중인 기능입니다
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 앱 정보 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.textMutedDark]}>
          정보
        </Text>
        <View style={[styles.settingItem, isDarkMode && styles.settingItemDark]}>
          <View style={styles.settingInfo}>
            <View>
              <Text style={[styles.settingLabel, isDarkMode && styles.textDark]}>
                앱 버전
              </Text>
              <Text style={[styles.settingDescription, isDarkMode && styles.textMutedDark]}>
                1.0.0
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 푸터 */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, isDarkMode && styles.textMutedDark]}>
          Semo's Library
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  containerDark: {
    backgroundColor: colors.background.cream,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.text.coffee,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.parchment,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemDark: {
    backgroundColor: colors.background.linen,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  settingLabel: {
    ...typography.bodyLarge,
    color: colors.text.espresso,
    fontWeight: '500',
  },
  settingDescription: {
    ...typography.bodySmall,
    color: colors.text.coffee,
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: colors.text.latte,
  },
  textDark: {
    color: colors.text.espresso,
  },
  textMutedDark: {
    color: colors.text.latte,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    ...typography.body,
    color: colors.text.coffee,
  },
});
