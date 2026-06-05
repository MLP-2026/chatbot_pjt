# 한 눈에 보는 직업능력개발훈련 (원격훈련과정)

사이드바 + 콘텐츠 형태의 클릭 기반 안내 챗봇입니다.

## 실행 방법

```bash
npm install      # 최초 1회 패키지 설치
npm run dev      # 개발 서버 실행 → http://localhost:5173
```

빌드(배포용 파일 생성):

```bash
npm run build    # dist/ 폴더에 결과물 생성
```

## 내용 채우는 법 ★ 중요

내용은 **섹션별로 파일이 나뉘어 있습니다.** 수정하려는 섹션 파일만 열면 됩니다.

| 섹션 | 수정할 파일 |
|------|-------------|
| 1. 훈련의 이해 | src/data/section1.js |
| 2. 비용지원 신청 | src/data/section2.js |
| 3. FAQ | src/data/section3.js |
| 4. 수행기관 | src/data/section4.js |
| 제목·부제목·업데이트 날짜 | src/data/index.js |

각 섹션 파일 안에는 두 가지가 있습니다:
- sectionN Menu : 사이드바에 표시될 메뉴 (항목 추가/삭제/이름 변경)
- sectionN Pages : 각 페이지에 표시될 실제 내용

### 콘텐츠 블록 5종

Pages 안의 blocks 배열에 아래를 넣어 화면을 구성합니다.

| 블록 | 작성 예 | 결과 |
|------|---------|------|
| info | { kind: "info", text: "강조 문장" } | 왼쪽 보라색 선 강조 박스 |
| chips | { kind: "chips", items: ["태그1","태그2"] } | 둥근 태그들 |
| steps | { kind: "steps", items: ["1단계","2단계"] } | 번호 단계 목록 |
| warns | { kind: "warns", items: ["주의1","주의2"] } | ! 표시 경고 목록 |
| faqs | { kind: "faqs", items: [{q:"질문?",a:"답변"}] } | Q/A 형태 |

본문 문단은 body 에 그냥 문자열로 작성하면 됩니다.

### 페이지를 추가하고 싶을 때

예를 들어 섹션 1에 1-(4) 를 추가하려면 src/data/section1.js 에서:

1. section1Menu.children 에 { id: "1-4", label: "1-(4) 새 항목" } 추가
2. section1Pages 에 "1-4": { tag, title, body, blocks } 추가

id 만 서로 일치시키면 됩니다.

## 파일 구조

```
src/
├── data/
│   ├── index.js       ← 제목·날짜 + 섹션 통합 (보통 날짜만 바꿈)
│   ├── section1.js    ← 1. 훈련의 이해
│   ├── section2.js    ← 2. 비용지원 신청
│   ├── section3.js    ← 3. FAQ
│   └── section4.js    ← 4. 수행기관
├── App.jsx
├── App.css            ← 디자인 (색상은 :root 변수)
├── main.jsx
└── components/
    ├── Sidebar.jsx    ← 왼쪽 메뉴
    └── Content.jsx    ← 오른쪽 내용 영역
```

## 디자인 색상 바꾸기

src/App.css 맨 위 :root 의 --accent 계열 색상값만 바꾸면 전체 포인트 컬러가 바뀝니다.
