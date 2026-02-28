import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { colors, typography } from '../constants';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* 테마 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>화면</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingIcon}>🌙</Text>
            <View>
              <Text style={styles.settingLabel}>다크 모드</Text>
              <Text style={styles.settingDescription}>
                어두운 테마를 사용합니다
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{
              false: colors.neutral.sand,
              true: colors.primary.maple,
            }}
            thumbColor={isDarkMode ? colors.primary.walnut : colors.white}
          />
        </View>
      </View>

      {/* 계정 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingIcon}>☁️</Text>
            <View>
              <Text style={styles.settingLabel}>클라우드 동기화</Text>
              <Text style={styles.settingDescription}>
                준비 중인 기능입니다
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 앱 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>정보</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingIcon}>📱</Text>
            <View>
              <Text style={styles.settingLabel}>앱 버전</Text>
              <Text style={styles.settingDescription}>1.0.0</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 푸터 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Semo's Library</Text>
        <Text style={styles.footerSubtext}>Made with 📚</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.neutral.coffee,
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
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingLabel: {
    ...typography.bodyLarge,
    color: colors.neutral.charcoal,
    fontWeight: '500',
  },
  settingDescription: {
    ...typography.bodySmall,
    color: colors.neutral.coffee,
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: colors.neutral.sand,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    ...typography.body,
    color: colors.neutral.coffee,
  },
  footerSubtext: {
    ...typography.caption,
    color: colors.neutral.sand,
    marginTop: 4,
  },
});
