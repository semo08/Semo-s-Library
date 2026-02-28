# Semo's Library - 개발 계획서

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | React Native + Expo |
| 언어 | TypeScript |
| 로컬 DB | expo-sqlite |
| 클라우드 DB | Supabase (추후) |
| 검색 API | 네이버 책 API |
| 상태 관리 | Zustand (경량) |
| 네비게이션 | React Navigation |

---

## 폴더 구조

```
semos-library/
├── app/                    # Expo Router 페이지
│   ├── (tabs)/             # 하단 탭 레이아웃
│   │   ├── index.tsx       # 홈
│   │   ├── search.tsx      # 검색
│   │   ├── collection.tsx  # 컬렉션
│   │   └── settings.tsx    # 설정
│   ├── book/
│   │   └── [id].tsx        # 책 상세
│   └── _layout.tsx
├── components/
│   ├── BookShelf.tsx       # 책장 UI
│   ├── BookCard.tsx        # 책 카드
│   ├── BookListItem.tsx    # 검색 결과 아이템
│   ├── StarRating.tsx      # 별점 컴포넌트
│   ├── EmptyState.tsx      # 빈 상태 안내
│   └── StatsCard.tsx       # 통계 카드
├── services/
│   ├── database.ts         # SQLite 관련
│   ├── naverApi.ts         # 네이버 책 API
│   └── supabase.ts         # Supabase (추후)
├── stores/
│   └── bookStore.ts        # Zustand 상태
├── constants/
│   ├── colors.ts           # 컬러 팔레트
│   └── typography.ts       # 폰트 설정
├── types/
│   └── book.ts             # Book, MyBook 타입
└── utils/
    └── helpers.ts
```

---

## 개발 단계

### Phase 1: 프로젝트 초기 설정
- [ ] Expo 프로젝트 생성 (TypeScript 템플릿)
- [ ] 폴더 구조 세팅
- [ ] React Navigation 하단 탭 설정
- [ ] 컬러/폰트 상수 정의

### Phase 2: 로컬 DB 구축
- [ ] expo-sqlite 설치 및 설정
- [ ] Book, MyBook 테이블 생성
- [ ] CRUD 함수 작성

### Phase 3: 네이버 책 API 연동
- [ ] 네이버 개발자 센터 API 키 발급
- [ ] 검색 API 연동
- [ ] 검색 화면 구현

### Phase 4: 핵심 UI 구현
- [ ] 컬렉션 화면 (그리드 뷰)
- [ ] 책 상세 페이지
- [ ] 별점/한줄평 입력
- [ ] 읽은 날짜 선택

### Phase 5: 홈 화면
- [ ] 책장 UI 구현
- [ ] 통계 카드
- [ ] 빈 상태 안내

### Phase 6: 설정 및 마무리
- [ ] 테마 (라이트/다크) 구현
- [ ] 로그아웃 기능 (추후 Supabase 연동 대비)
- [ ] 전체 UI 다듬기

### Phase 7: (추후) Supabase 연동
- [ ] Supabase 프로젝트 생성
- [ ] 인증 구현
- [ ] 클라우드 동기화

---

## 네이버 책 API

### 발급 방법
1. https://developers.naver.com 접속
2. 애플리케이션 등록
3. 검색 > 책 API 선택
4. Client ID, Client Secret 발급

### 요청 예시
```
GET https://openapi.naver.com/v1/search/book.json?query=검색어
Headers:
  X-Naver-Client-Id: {CLIENT_ID}
  X-Naver-Client-Secret: {CLIENT_SECRET}
```

### 응답 필드
- title, author, publisher, pubdate
- image (표지 URL)
- description, isbn

---

## 컬러 팔레트 (colors.ts)

```typescript
export const colors = {
  // Primary
  walnut: '#5D4037',
  oak: '#8B7355',
  maple: '#D4A574',

  // Background
  cream: '#FBF7F0',
  parchment: '#F5E6D3',
  linen: '#EDE4D8',

  // Accent
  gold: '#C9A227',
  forest: '#6B8E6B',

  // Neutral
  charcoal: '#2C2416',
  coffee: '#6B5B4F',
  sand: '#C4B8A8',

  // Dark mode
  espresso: '#1A1612',
  darkParchment: '#2A241E',
};
```

---

## 시작 명령어

```bash
# 프로젝트 생성
npx create-expo-app semos-library --template expo-template-blank-typescript
cd semos-library

# 필수 패키지 설치
npx expo install expo-sqlite expo-font
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install zustand
npm install react-native-safe-area-context react-native-screens

# 실행
npx expo start
```
