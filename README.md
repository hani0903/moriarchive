# moriarchive

Next.js + 로컬 MDX 기반 개인 포트폴리오·블로그. 현재는 기능 구현 단계이며 최종 디자인과 실제 콘텐츠는 준비 중입니다.

디자인 토큰·레이아웃·컴포넌트 규칙은 [DESIGN.md](DESIGN.md)에 정리했습니다.

## 처음 테스트하기

패키지 매니저는 pnpm 10.15.1입니다. npm과 잠금 파일을 섞지 않고 pnpm으로 통일합니다.

```sh
pnpm install
pnpm dev:demo
```

터미널에 표시된 주소를 열고 메뉴 → 알고리즘 → DP → 예제 글을 확인하세요. 목차, 코드 복사, 글 하단 이동, 다크 모드를 눌러볼 수 있습니다. 데모는 테스트 파일만 읽고 실제 콘텐츠를 바꾸지 않습니다. 서버 종료는 Ctrl+C입니다.

## 내 글로 실행

```sh
pnpm install
pnpm dev
pnpm check
```

## 글 작성

```sh
pnpm post:new my-post --title "글 제목" --category algorithm-dp
pnpm post:new imported-post --title "이전 글" --date 2024-03-12 --category algorithm-dp
```

`content/posts`의 MDX를 편집합니다. 공개일은 `date`로 명시하며 Git 커밋 날짜와 무관합니다. `draft: false`일 때만 공개됩니다. 원래 글 링크는 `originalUrl`, 실질적인 수정일은 `updated`에 기록합니다. 기본 예제는 비공개입니다.

- `content/categories.ts`: 2단계 분류. 표시 이름과 URL slug 분리.
- `content/projects.ts`: 프로젝트와 홈 노출 순서. 실제 내용 입력 전 빈 목록.
- `content/site.ts`: 소개·이력서·GitHub·이메일 링크.
- `public/images`: 썸네일. 미지정 시 기본 이미지 사용.
- `.env.example`: 실제 배포 전에 `SITE_URL` 지정. 미설정 시 localhost/noindex.

## 구조

파일 읽기 → 스키마 검증 → 공개 정책·분류·정렬 → 화면과 metadata/sitemap으로 연결합니다.

설치한 라이브러리의 버전은 pnpm-lock.yaml에 고정됩니다. 테스트 fixture는 본인 작성 글이 아닌 기능 검증용 데이터입니다.
