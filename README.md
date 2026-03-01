# 📚 Semo's Library

> 종이책을 사랑하는 사람들을 위한 개인 서재 관리 앱

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-blue)
![React Native](https://img.shields.io/badge/React%20Native-TypeScript-3178C6)

---

## 📖 프로젝트 소개

읽은 책을 기록하고, 읽고 싶은 책을 저장하며, 나만의 독서 여정을 시각화하는 앱이에요.
네이버 책 API로 책을 검색하고, 별점과 한줄평을 남겨 나만의 서재를 만들어보세요.

---

## 📱 스크린샷

> 🚧 개발 진행 중 - 스크린샷 추후 추가 예정

| 홈 | 검색 | 컬렉션 | 설정 |
|---|---|---|---|
| 준비 중 | 준비 중 | 준비 중 | 준비 중 |

---

## ✨ 주요 기능

- 🔍 **책 검색** - 네이버 책 API로 책 검색 및 컬렉션 추가
- 📚 **책장 UI** - 최근 읽은 책을 책장으로 시각화
- ⭐ **별점 & 한줄평** - 0.5점 단위 별점, 50자 한줄평 기록
- 📅 **읽은 날짜** - 독서 날짜 기록
- 🌙 **다크 모드** - 라이트/다크 테마 지원
- 📊 **독서 통계** - 읽은 책 수, 평균 별점, 이번 달 독서량

---

## 🛠 기술 스택

| 구분 | 기술 | 설명 |
|---|---|---|
| 프레임워크 | React Native + Expo | 크로스 플랫폼 모바일 앱 |
| 언어 | TypeScript | 타입 안전성 |
| 로컬 DB | expo-sqlite | 기기 내 데이터 저장 |
| 상태 관리 | Zustand | 경량 전역 상태 관리 |
| 네비게이션 | React Navigation | 하단 탭 + 스택 네비게이션 |
| 검색 API | 네이버 책 API | 책 검색 및 도서 정보 |
| 클라우드 DB | Supabase | 추후 연동 예정 |

---

## 🚀 시작하기

### 사전 준비

- Node.js 설치
- Expo Go 앱 설치 (iOS / Android)
- 네이버 개발자 센터 API 키 발급

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/semo08/semos-library.git
cd semos-library

# 패키지 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 네이버 API 키 입력

# 실행
npx expo start
```

### 환경변수

```
NAVER_CLIENT_ID=발급받은_Client_ID
NAVER_CLIENT_SECRET=발급받은_Client_Secret
```

---

## 📁 폴더 구조

```
semos-library/
├── src/
│   ├── components/      # 재사용 컴포넌트
│   ├── constants/       # 색상, 타이포그래피 상수
│   ├── navigation/      # React Navigation 설정
│   ├── screens/         # 화면 컴포넌트
│   ├── services/        # DB, API 서비스
│   ├── stores/          # Zustand 상태관리
│   ├── types/           # TypeScript 타입
│   └── utils/           # 유틸 함수
├── App.tsx
└── package.json
```

---

## 🗺 개발 로드맵

| Phase | 내용 | 상태 |
|---|---|---|
| Phase 1 | 프로젝트 초기 설정, 폴더 구조, 기본 화면 4개 | ✅ 완료 |
| Phase 2 | expo-sqlite 로컬 DB 구축 및 검증 | ⏳ 진행 예정 |
| Phase 3 | 네이버 책 API 연동, 검색 기능 구현 | ⏳ 진행 예정 |
| Phase 4 | 컬렉션 화면, 책 상세, 별점/한줄평 UI | ⏳ 진행 예정 |
| Phase 5 | 홈 화면 책장 UI, 통계 데이터 연동 | ⏳ 진행 예정 |
| Phase 6 | 다크 모드, UI 마무리 | ⏳ 진행 예정 |
| Phase 7 | Supabase 연동, 클라우드 동기화 | 🔮 추후 예정 |

---

## 🎨 디자인 시스템

책장 나무 톤을 기반으로 한 따뜻한 베이지 컬러 팔레트를 사용해요.

```
Walnut  #5D4037  ███  주요 액센트
Oak     #8B7355  ███  보조 텍스트
Maple   #D4A574  ███  강조
Cream   #FBF7F0  ███  메인 배경
Gold    #C9A227  ███  별점
```

---

## 📝 라이선스

MIT License