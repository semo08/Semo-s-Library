# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Semo's Library** - 종이책 검색 및 개인 컬렉션 관리 앱

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | React Native + Expo |
| 언어 | TypeScript |
| 로컬 DB | expo-sqlite |
| 클라우드 DB | Supabase (추후) |
| 검색 API | 네이버 책 API |
| 상태 관리 | Zustand |
| 네비게이션 | React Navigation |

## 주요 명령어

```bash
# 프로젝트 생성
npx create-expo-app semos-library --template expo-template-blank-typescript

# 실행
npx expo start

# iOS 시뮬레이터
npx expo start --ios

# 빌드
npx expo build
```

## 앱 구조

**하단 탭**: 홈 / 검색 / 컬렉션 / 설정

- **홈**: 통계 카드 + 책장 UI (읽은 책 쇼케이스)
- **검색**: 네이버 책 API 검색 + 빠른 추가 버튼
- **컬렉션**: 읽은 책 | 읽고 싶은 책 (그리드 뷰)
- **책 상세**: 책 정보 + 별점(5점/반점) + 한줄평(50자) + 읽은 날짜
- **설정**: 테마(라이트/다크) + 로그아웃

## 데이터 모델

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  coverUrl: string;
  description: string;
  isbn: string;
}

interface MyBook {
  id: string;
  bookId: string;
  collectionType: 'read' | 'wishlist';
  rating: number;      // 0.5 ~ 5.0
  review: string;      // 50자
  readDate: string | null;
  createdAt: string;
  updatedAt: string;
}
```

## 컬러 팔레트

```typescript
// Primary (책장 나무 톤)
walnut: '#5D4037'    // 주요 액센트
oak: '#8B7355'       // 텍스트/아이콘
maple: '#D4A574'     // CTA/강조

// Background (베이지 톤)
cream: '#FBF7F0'     // 메인 배경
parchment: '#F5E6D3' // 카드/서페이스

// Accent
gold: '#C9A227'      // 별점
```

## 개발 참고사항

- 상세 개발 계획: `DEVELOPMENT_PLAN.md` 참조
- 네이버 책 API 키 필요 (developers.naver.com)
- 홈 검색창은 버튼 스타일로 구현 (가짜 입력창 X)
- 그리드 터치 타겟 최소 44pt 유지
- 빈 책장 상태 UX 중요 ("첫 책을 추가해보세요")

---

## Claude 에이전트

`.claude/agents/`에 개발 지원 에이전트 정의:
- **frontend-developer.md** - React/Vue/Angular 전문가
- **mobile-developer.md** - React Native/Flutter 전문가
- **ui-ux-designer.md** - 연구 기반 UX 비평가
