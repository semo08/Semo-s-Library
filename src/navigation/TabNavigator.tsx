import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants';

// 임시 화면 컴포넌트들 (추후 실제 화면으로 교체)
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Collection: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// 간단한 아이콘 컴포넌트 (추후 아이콘 라이브러리로 교체 가능)
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    Search: '🔍',
    Collection: '📚',
    Settings: '⚙️',
  };

  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>
      {icons[name]}
    </Text>
  );
};

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: colors.primary.terracotta,
        tabBarInactiveTintColor: colors.text.coffee,
        tabBarStyle: {
          backgroundColor: colors.background.parchment,
          borderTopColor: colors.background.linen,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background.cream,
        },
        headerTintColor: colors.primary.terracotta,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerStatusBarHeight: insets.top + 8,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerTitle: "Semo's Library",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '검색',
          headerTitle: '책 검색',
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          title: '컬렉션',
          headerTitle: '내 서재',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '설정',
          headerTitle: '설정',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
});
