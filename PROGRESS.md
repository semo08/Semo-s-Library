# Semo's Library - 개발 진행 상황

## Phase 1: 프로젝트 초기 설정 ✅ 완료

**완료일**: 2026-03-01
**Expo SDK**: 54.0.0 (Expo Go 호환)

### 완료 항목

- [x] Expo 프로젝트 생성 (TypeScript 템플릿)
- [x] 폴더 구조 세팅
  ```
  src/
  ├── components/      # 재사용 컴포넌트
  ├── constants/       # 색상, 타이포그래피 상수
  ├── navigation/      # React Navigation 설정
  ├── screens/         # 화면 컴포넌트
  ├── services/        # DB, API 서비스
  ├── stores/          # Zustand 상태관리
  ├── types/           # TypeScript 타입
  └── utils/           # 유틸 함수
  ```
- [x] React Navigation 하단 탭 설정
  - 홈 / 검색 / 컬렉션 / 설정 4개 탭
- [x] 컬러 상수 정의 (`colors.ts`)
  - 라이트 모드 / 다크 모드 컬러 팔레트
- [x] 폰트/타이포그래피 상수 정의 (`typography.ts`)
- [x] 기본 화면 4개 생성 (빈 상태 UI 포함)
  - `HomeScreen.tsx` - 통계 카드 + 책장 빈 상태
  - `SearchScreen.tsx` - 검색 입력창 + 빈 상태
  - `CollectionScreen.tsx` - 읽은책/읽고싶은책 탭 + 빈 상태
  - `SettingsScreen.tsx` - 다크모드 스위치 + 앱 정보

### 추가 구현됨 (Phase 2, 3 선행 작업)

- [x] 데이터 타입 정의 (`types/book.ts`)
  - `Book`, `MyBook`, `CollectionType` 등
- [x] Zustand 스토어 설정 (`stores/bookStore.ts`)
- [x] SQLite 데이터베이스 서비스 (`services/database.ts`)
  - 테이블 생성, CRUD 함수 구현
- [x] 네이버 책 API 서비스 (`services/naverApi.ts`)
  - API 키 설정 필요 (TODO)
- [x] 헬퍼 유틸 함수 (`utils/helpers.ts`)

---

## Phase 2: 로컬 DB 구축 ⏳ 진행 예정

### 할 일

- [ ] expo-sqlite 테스트 및 검증
- [ ] 데이터 마이그레이션 로직 (버전 관리)

---

## Phase 3: 네이버 책 API 연동 ⏳ 진행 예정

### 할 일

- [ ] 네이버 개발자 센터에서 API 키 발급
- [ ] `.env` 또는 설정 파일에 API 키 저장
- [ ] 검색 기능 실제 연동 테스트
- [ ] 검색 결과 UI 구현 (BookListItem)

---

## Phase 4: 핵심 UI 구현 ⏳ 진행 예정

### 할 일

- [ ] 컬렉션 화면 그리드 뷰
- [ ] 책 상세 페이지
- [ ] 별점 컴포넌트 (0.5점 단위)
- [ ] 한줄평 입력 (50자)
- [ ] 읽은 날짜 선택

---

## Phase 5: 홈 화면 ⏳ 진행 예정

### 할 일

- [ ] 책장 UI 구현
- [ ] 실제 통계 데이터 연동
- [ ] 빈 상태 → 책 있는 상태 전환

---

## Phase 6: 설정 및 마무리 ⏳ 진행 예정

### 할 일

- [ ] 다크 모드 실제 적용
- [ ] 테마 상태 저장 (AsyncStorage)
- [ ] UI 다듬기

---

## Phase 7: Supabase 연동 (추후) 🔮

### 할 일

- [ ] Supabase 프로젝트 생성
- [ ] 인증 구현
- [ ] 클라우드 동기화

---

## 메모

- 네이버 API 키 발급: https://developers.naver.com
- 그리드 터치 타겟: 최소 44pt 유지
