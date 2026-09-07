---
name: moriarchive
version: '0.11'
status: proposed
updated: '2026-09-07'
language: ko
direction: '숲에 도토리를 모으듯 글을 쌓는 아카이브. 문서의 명료함 + 개인 블로그의 읽기 경험'
  # 값의 출처는 본문 "출처 표기" 규칙을 따른다. [관찰]=추출 JSON 실측, [결정]=우리가 정함, [제안]=첫 시안 기본값, TBD=미정.
tokens:
    color:
        # [결정] 도토리 갈색. mori(숲) 아카이브에서 글 하나 = 도토리 하나.
        primary:
            50: '#FFF8F1'
            100: '#FCEEDF'
            200: '#F5D8BC'
            300: '#EAB98C'
            400: '#DB9F6B'
            500: '#C98550'
            600: '#AC6739'
            700: '#894C2D'
            800: '#703E2A'
            900: '#5D3527'
            950: '#321A12'
        # [결정] 라이트·다크 양끝에 모두 쓸 단계가 있도록 재설계. 역할은 "중립 램프의 단계별 역할" 표 참조.
        gray:
            50: '#FCFCFC'
            100: '#F6F6F6'
            200: '#EDEDED'
            300: '#E0E0E0'
            400: '#C4C4C4'
            500: '#8E8E8E'
            600: '#707070'
            700: '#616161'
            800: '#2E2E2E'
            900: '#1F1F1F'
            950: '#141414'
        light:
            bg: 'gray-50' # 페이지 배경
            surface: '#FFFFFF' # 카드·콘텐츠 표면
            panel: 'gray-100' # 목차·코드·태그 등 보조 표면
            line: 'gray-300' # 콘텐츠 구분선 (장식)
            lineStrong: 'gray-500' # 컨트롤 경계 (3:1 필요)
            textPrimary: 'gray-900'
            textSecondary: 'gray-700'
            textTertiary: 'gray-600'
            accent: 'primary-700'
            accentHover: 'primary-800'
            accentSurface: 'primary-50' # 도토리 칩 배경
            accentSurfaceFg: 'primary-800'
            scrollbarThumb: 'gray-400'
            scrollbarThumbHover: 'gray-500'
            scrollbarTrack: 'transparent'
        dark:
            bg: 'gray-950'
            surface: 'gray-900'
            panel: 'gray-900'
            line: 'gray-800'
            lineStrong: 'gray-600'
            textPrimary: 'gray-50'
            textSecondary: 'gray-300'
            textTertiary: 'gray-400'
            accent: 'primary-300'
            accentHover: 'primary-200'
            accentSurface: '#2E2418' # primary-950과 gray-900 사이. 도토리 칩 배경
            accentSurfaceFg: 'primary-200'
            scrollbarThumb: 'gray-600'
            scrollbarThumbHover: 'gray-500'
            scrollbarTrack: 'transparent'
    typography:
        sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
        mono: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace'
        display: { size: '2.5rem', lineHeight: 1.25, weight: 700, tracking: '-0.02em' } # 홈 히어로
        title: { size: '2rem', lineHeight: 1.35, weight: 700 }
        titleMobile: { size: '1.75rem', lineHeight: 1.4, weight: 700 }
        h2: { size: '1.5rem', lineHeight: 1.5, weight: 700 }
        h3: { size: '1.125rem', lineHeight: 1.6, weight: 600 }
        cardTitle: { size: '1.125rem', lineHeight: 1.45, weight: 700 }
        body: { size: '1rem', lineHeight: 1.8, weight: 400 }
        ui: { size: '0.875rem', lineHeight: 1.5, weight: 500 }
        meta: { size: '0.875rem', lineHeight: 1.6, weight: 400 }
        caption: { size: '0.75rem', lineHeight: 1.4, weight: 500 }
        code: { size: '0.875rem', lineHeight: 1.7, weight: 400 }
    space: ['4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px']
    radius: { inline: '4px', control: '6px', surface: '8px', card: '10px', pill: '9999px' }
    layout:
        shellMax: '1080px'
        shellMaxWide: '1200px' # 1280px 이상. 우측 목차를 위한 폭
        articleMax: '860px'
        tocWidth: '220px'
        columnGap: '40px'
        cardThumbWidth: '220px'
        gutterMobile: '20px'
        gutterDesktop: '32px'
        headerHeight: '69px'
        mobileMax: '639px'
        tabletMax: '1023px'
        desktopWideMin: '1280px'
        sidebarWidth: '260px'
        sidebarOverlayMax: '769px' # 이하에서는 밀지 않고 덮는다
        tocFloatMin: '1380px' # shell-content 기준. 860 + 2 x (40 + 220)
    icon: { family: 'lucide-react', size: 20, smallSize: 16, strokeWidth: 1.75, targetSize: '44px' }
    motion: { duration: '150ms', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    focus: { width: '3px', offset: '4px', colorRole: 'accent' }
    shadow:
        card: '0 1px 2px rgba(0, 0, 0, 0.05)'
        overlay: '0 4px 12px rgba(0, 0, 0, 0.12)'
---

# moriarchive 디자인 기준

**mori(숲)의 아카이브.** 글 하나하나를 도토리로 모아 쌓는 개인 블로그다. 한국어 기술 글과 프로젝트 경험을 오래 읽기 편하게 담고, 독자가 분류를 탐색해 다른 글과 작업으로 이동할 수 있어야 한다.

이 문서는 블로그의 디자인 기준이고, `.agents/skills/frontend-design/SKILL.md`는 이 기준으로 작업하는 방법이다. 스킬의 일반적인 미적 권고보다 이 문서의 방향을 우선한다.

## 출처 표기 규칙

값을 볼 때 반드시 구분한다. 이 구분이 이 문서의 핵심이다.

| 표기       | 뜻                                                              |
| ---------- | --------------------------------------------------------------- |
| **[관찰]** | `.local-docs/design-site/output`의 추출 JSON에 실제로 기록된 값 |
| **[결정]** | 우리가 정한 값. 레퍼런스에 없거나 다르게 정한 것                |
| **[제안]** | 첫 시안의 기본값. 실제 화면을 보고 바꿀 수 있음                 |
| **TBD**    | 아직 정하지 않음                                                |

`status: proposed`는 문서 전체가 아직 최종 확정 전이라는 뜻이다.

---

## 1. 레퍼런스와 역할 분담

사용자가 고른 4개 사이트에서 **각각 다른 것 하나씩만** 가져온다. 어떤 사이트의 브랜드도 통째로 복제하지 않는다.

| 출처                                                                       | 우리가 가져올 것                                       | 상태                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| [Expo 문서](https://docs.expo.dev/) [R1]                                   | **색 역할 체계, 라이트·다크 대응 방식, 스크롤바 테마** | 추출 자료 부족 → 방법만 차용, 값은 [결정] |
| [loke.dev](https://nextjs-mdx-blog.loke.dev/) [R4]                         | **홈 화면 배치**                                       | 추출 양호. 값 사용 가능                   |
| [Sprinters](https://www.sprinters.run/) [R3]                               | **글 카드 형식, 한국어 조판 밀도**                     | 홈만 추출됨. 카테고리 페이지 재추출 필요  |
| [Tailwind 문서](https://tailwindcss.com/docs/installation/using-vite) [R2] | **본문·코드 블록 조판**                                | 내지를 추출해 양호                        |

### 추출 자료의 한계 — 먼저 읽을 것

2026-09-06에 dembrandt 0.31.1로 뽑은 4개 JSON을 전부 열어 확인했다. 모두 HTTP 200, 뷰포트 1920×1080, `fontsReady: true`, `flags: {}`다. 그리고 **다음 세 가지는 이 자료로 알 수 없다.**

1. **다크 모드가 하나도 없다.** 4개 파일 전부 라이트 테마 렌더 결과다. Expo JSON의 `cssVariables`에 `-dark` 접미사 변수가 몇 개(`--switch-background-color-dark: #333`, `--button-text-dark: #b3b3b3`) 들어 있지만 위젯용이고 테마 램프가 아니다. **이 문서의 다크 값은 전부 [결정]이다.**
2. **스크롤바 정보가 없다.** 추출기 스키마 자체에 스크롤바 항목이 없다(`colors / typography / spacing / borderRadius / borders / shadows / gradients / motion / components / breakpoints / iconSystem / frameworks`). **전부 [결정]이다.**
3. **카드 "구조"가 없다.** `components`는 `buttons / inputs / links / badges` 4종뿐이고 card 카테고리가 없다. 카드에서 얻을 수 있는 건 색·크기·간격·라운드뿐이고, 배치 구조는 스크린샷으로 봐야 한다.

추가로 **Expo 스냅샷은 4개 중 가장 얇다.** `meta.contentLength`가 Expo 3,857인 반면 loke 54,037 / sprinters 66,411 / Tailwind 196,348이다. `docs.expo.dev/` 루트는 실제 문서 본문이 거의 잡히지 않았다. 그래서 Expo에서는 **관찰값이 아니라 색 역할 설계 방식만** 가져온다.

그 밖의 주의:

- `semantic.primary`와 `palette.role`은 추출기의 자동 분류다. Expo의 분홍 `primary`(`rgb(207,56,151)`), Tailwind의 회색 `primary`(`#4a5565`)를 브랜드 대표색으로 삼지 않는다.
- Expo `body` 분류에 `16px / lineHeight 1.0`이 73건 있다. 이름이 `body`라고 장문 본문 스타일이 아니다.
- Tailwind·loke의 `breakpoints: []`는 반응형이 없다는 뜻이 아니라 관찰되지 않았다는 뜻이다. sprinters만 `600 / 639 / 767 / 768 / 1024px`가 잡혔다.
- `3.35544e+07px` 라운드는 실무 토큰으로 복사하지 않는다. 원형이 필요하면 `pill`을 쓴다.
- `components`의 모든 `hover` 상태가 `null`이다. hover 값은 추출되지 않았다.

---

## 2. 색 — Expo의 방식, 도토리의 색

### 왜 램프를 다시 짰나

Expo 문서(Radix 기반)의 라이트 중립색 관찰값은 `#f9f9fb → #d9d9e0 → #8b8d98 → #80838d → #60646c → #1c2024 → #000000`이다 [관찰, R1]. 여기서 배울 것은 **hex가 아니라 "한 램프의 각 단계에 고정된 역할이 있다"는 구조**다. 배경용 단계, 표면용 단계, 경계용 단계, 텍스트용 단계가 분리돼 있어서 다크 모드로 갈 때 단계를 갈아끼우기만 하면 된다.

v0.1의 램프는 다크 쪽 단계가 부족해서 `surface`·`surfaceSoft`·`panel`이 전부 `#2A2A2A` 하나로 무너졌다. 그래서 다크에서 목차·태그·인라인 코드 배경이 본문 배경과 같은 색이 됐다. 이번 램프는 **어두운 쪽 끝에 `800 / 900 / 950` 세 단계를 확보**해 그 문제를 없앤다.

### 중립 램프의 단계별 역할 [결정]

| 단계       | HEX       | 라이트에서                    | 다크에서                        |
| ---------- | --------- | ----------------------------- | ------------------------------- |
| `gray-50`  | `#FCFCFC` | **페이지 배경**               | **본문 텍스트**                 |
| `gray-100` | `#F6F6F6` | **보조 표면**(목차·코드·태그) | —                               |
| `gray-200` | `#EDEDED` | hover 배경                    | —                               |
| `gray-300` | `#E0E0E0` | **구분선**                    | **보조 텍스트**                 |
| `gray-400` | `#C4C4C4` | 스크롤바 thumb                | **3차 텍스트**                  |
| `gray-500` | `#8E8E8E` | **컨트롤 경계**               | 스크롤바 hover                  |
| `gray-600` | `#707070` | **3차 텍스트**                | **컨트롤 경계**, 스크롤바 thumb |
| `gray-700` | `#616161` | **보조 텍스트**               | —                               |
| `gray-800` | `#2E2E2E` | —                             | **구분선**                      |
| `gray-900` | `#1F1F1F` | **본문 텍스트**               | **표면·보조 표면**              |
| `gray-950` | `#141414` | —                             | **페이지 배경**                 |

라이트는 위에서, 다크는 아래에서 읽는다. 두 테마가 같은 램프를 쓰되 단계만 반대로 잡는 구조다.

### 도토리 primary [결정]

**브랜드 색은 도토리의 따뜻한 갈색이다.** 숲(mori)에 도토리(글)를 모은다는 아이덴티티에서 나온 결정이며, 어떤 레퍼런스의 관찰값도 아니다 — Expo는 파랑, Tailwind는 회색, loke는 파랑, sprinters는 회색이다. 이 색이 이 블로그를 다른 문서 사이트와 구분하는 유일한 시각 요소다.

| 단계          | 용도                                                    |
| ------------- | ------------------------------------------------------- |
| `50` · `100`  | 도토리 칩·강조 블록 배경 (라이트)                       |
| `200`         | 다크 강조 텍스트, 링크 hover (다크)                     |
| `300`         | **다크 accent** — 본문 링크, 포커스 링, 인용문 세로선   |
| `400` · `500` | 브랜드 마크, 큰 장식. **작은 텍스트에 쓰지 않음**       |
| `600`         | 채워진 버튼 배경 후보 (TBD)                             |
| `700`         | **라이트 accent** — 본문 링크, 포커스 링, 인용문 세로선 |
| `800`         | 라이트 링크 hover, 도토리 칩 텍스트                     |
| `900` · `950` | 어두운 강조 텍스트                                      |

`primary-500`(`#C98550`)은 흰 배경에서 대비 3.0 미만이다. **작은 링크·본문 텍스트에는 절대 쓰지 않는다.** 브랜드 마크와 아이콘 같은 큰 면적에만 쓴다.

### 검증한 대비 [결정 / 계산값]

전부 WCAG 상대휘도로 계산했다. 본문 크기 텍스트 기준 AA는 4.5, UI 경계 기준(1.4.11)은 3.0이다.

**라이트** — 배경 `#FCFCFC`, 표면 `#FFFFFF`, 보조 표면 `#F6F6F6`

| 역할         | 값            | 배경    | 표면    | 보조 표면 | Expo 실측 [관찰] |
| ------------ | ------------- | ------- | ------- | --------- | ---------------- |
| 본문 텍스트  | `gray-900`    | 16.07 ✓ | 16.48 ✓ | 15.25 ✓   | `#1c2024` 16.39  |
| 보조 텍스트  | `gray-700`    | 6.04 ✓  | 6.19 ✓  | 5.73 ✓    | `#60646c` 5.94   |
| 3차 텍스트   | `gray-600`    | 4.83 ✓  | 4.95 ✓  | 4.58 ✓    | `#80838d` 3.78 ✗ |
| accent(링크) | `primary-700` | 6.53 ✓  | 6.70 ✓  | 6.20 ✓    | `#0c6bbf` 5.42   |
| accent hover | `primary-800` | 8.49 ✓  | 8.71 ✓  | 8.06 ✓    | —                |
| 컨트롤 경계  | `gray-500`    | 3.19 ✓  | —       | 3.03 ✓    | —                |

본문과 보조는 **Expo 실측에 맞췄다**. 3차만 Expo가 AA 미달(3.78)이라 4.83으로 올렸다 — 여기서만 Expo를 따르지 않는다.

**다크** — 배경 `#141414`, 표면·보조 표면 `#1F1F1F`

| 역할                 | 값            | 배경    | 표면    |
| -------------------- | ------------- | ------- | ------- |
| 본문 텍스트          | `gray-50`     | 17.96 ✓ | 16.07 ✓ |
| 보조 텍스트          | `gray-300`    | 13.96 ✓ | 12.49 ✓ |
| 3차 텍스트           | `gray-400`    | 10.56 ✓ | 9.45 ✓  |
| accent(링크)         | `primary-300` | 10.37 ✓ | 9.28 ✓  |
| accent hover         | `primary-200` | 13.54 ✓ | 12.11 ✓ |
| 컨트롤 경계·스크롤바 | `gray-600`    | 3.72 ✓  | 3.33 ✓  |

도토리 칩: 라이트 `primary-800` on `primary-100` = 7.64 ✓ / 다크 `primary-200` on `#2E2418` = 11.17 ✓.

**다크 표면 분리 검증** [관찰, R1-dark]: Expo 다크는 `background #111113` / `secondary #18191b`로 두 표면 대비가 1.07이다. 우리는 `#141414` / `#1F1F1F`로 1.12 — 구조가 같고 층 분리가 조금 더 명확하다. v0.1의 표면 붕괴가 해결됐음을 관찰로 확인했다.

값을 바꾸면 이 표도 다시 계산해서 갱신한다. 계산 없이 색을 바꾸지 않는다.

### 텍스트 색은 3단계까지만 [결정]

레퍼런스의 실측 중립 텍스트 단계는 **2~3개**다. 4단계를 쓰는 곳은 없다. 우리도 **3단계로 고정한다.**

#### 왜 Expo를 채택했나 [결정]

2026-09-07 재추출로 Expo 문서 내지와 Sprinters 카테고리·글 상세를 비교했다.

| 역할             | **Expo** [관찰, R1]         | **Sprinters** [관찰, R3]        |
| ---------------- | --------------------------- | ------------------------------- |
| 본문·제목        | `#1c2024` 16.39             | `#030712` 20.13                 |
| 보조 (최다 사용) | `#60646c` **5.94**          | `#6a7282` **4.84**              |
| 3차              | `#80838d` 3.78 ✗            | `#99a1af` 2.60 (텍스트 아님)    |
| 글 상세 전용     | —                           | `#364153` 10.30, `#4a5565` 7.56 |
| 링크             | `#0c6bbf` 5.42              | 없음 (굵기로만)                 |
| **색 성격**      | **거의 무채색** (chroma ≈5) | **파란 회색** (chroma ≈10)      |

Expo를 고른 이유는 세 가지다.

1. **색온도.** Sprinters는 Tailwind slate 계열이라 회색이 파랗다. **파란 회색과 도토리 갈색 accent는 색온도가 부딪힌다.** Expo는 거의 무채색이라 어떤 accent와도 충돌하지 않는다. 도토리를 브랜드로 유지하는 이상 회색은 중립이어야 한다. 이게 결정적이었다.
2. **Expo가 보조 텍스트를 더 진하게 쓴다**(5.94 vs 4.84). 한국어는 획이 복잡해 연한 회색에서 더 빨리 뭉갠다.
3. **본문을 순검정로 두지 않는다.** Expo `#1c2024`(16.39)는 순검정(21.0)보다 부드럽다. Sprinters도 글 상세에서만 `#364153`을 추가로 쓴다 — 장문 본문을 완화하는 같은 판단이다. 우리도 `gray-950`(17.96)에서 `gray-900`(16.07)으로 내렸다.

**단, Expo의 3차·4차는 따라가지 않는다.** `#80838d`(3.78)와 `#8b8d98`(3.30)는 본문 크기 AA 미달이다. 우리 3차는 4.83으로 올려 둔다.

회색 램프는 브랜드가 아니다. 무채색 회색은 어느 사이트에서든 수렴하는 게 정상이고, moriarchive의 차별화는 **도토리 accent와 한국어 조판(행간 1.8)과 글 카드**에서 나온다. 회색을 억지로 비틀어 브랜드를 만들려 하지 않는다.

| 역할               | 쓰는 곳                                               |
| ------------------ | ----------------------------------------------------- |
| `--text-primary`   | 제목, 본문                                            |
| `--text-secondary` | 날짜, 분류, breadcrumb, 요약, 코드 파일명             |
| `--text-tertiary`  | 코드 언어 라벨, 복사 버튼처럼 존재감을 낮춰야 하는 UI |

- **`--text-disabled`는 만들지 않는다.** 현재 코드베이스에 `disabled` 컨트롤이 하나도 없다. 실제로 비활성 컨트롤이 생길 때 그때 추가한다.
- **`--fg` / `--muted` 별칭도 만들지 않는다.** 같은 색에 이름이 둘이면 컴포넌트마다 다른 이름을 골라 쓰게 되고 나중에 일괄 변경이 안 된다. `--text-primary` / `--text-secondary` 한 벌만 쓴다.
- 중요한 설명을 3차 텍스트로 낮추지 않는다. 3차는 **정보가 아니라 라벨**에만 쓴다.

### 색 사용 규칙

- `accent`는 본문 링크, 현재 선택, 키보드 포커스, 인용문 세로선에만 쓴다. 모든 제목과 굵은 글자를 색칠하지 않는다.
- 본문 링크는 밑줄을 유지한다. 탐색 링크(헤더·목록 제목)는 중립색 + 밑줄 없음으로 두고, hover에서 `accent`로 간다 — loke도 같은 방식이다(`links[].color: lab(2.75 0 0)`, `textDecoration: none`) [관찰, R4].
- **`line`(구분선)과 `lineStrong`(컨트롤 경계)을 분리한다.** 구분선은 장식이라 대비가 낮아도 되지만, 버튼·입력처럼 경계가 유일한 식별 수단인 요소는 3:1이 필요하다. v0.1은 둘을 같은 값으로 써서 버튼 테두리 대비가 1.12였다.
- 현재 메뉴는 색 하나에만 의존하지 않는다. 색 + 굵기 + `aria-current="page"`를 함께 쓴다.
- 의미를 색으로만 전달하지 않는다. 인용문·경고는 구조와 문장으로도 구분되어야 한다.

### 스크롤바 [결정]

Expo·Tailwind 문서 모두 긴 사이드바와 코드 블록에서 스크롤바가 본문과 따로 놀지 않는다. 추출 자료에는 값이 없으므로 직접 정한다.

1. **`color-scheme`을 먼저 맞춘다.** `:root { color-scheme: light }` / `.dark { color-scheme: dark }`만으로 브라우저 기본 스크롤바, 셀렉트, 폼 컨트롤이 테마를 따라온다. 이게 가장 큰 효과이고 이미 구현돼 있다.
2. 그 위에 표준 속성으로 얇고 중립적인 thumb를 지정한다. `scrollbar-width: thin`, `scrollbar-color: <thumb> transparent`.
3. WebKit 계열에 `::-webkit-scrollbar`(10px), `::-webkit-scrollbar-thumb`(라운드 `pill`, hover에서 한 단계 진하게), `::-webkit-scrollbar-track: transparent`를 보조로 둔다.
4. **thumb에 accent를 쓰지 않는다.** 도토리색 스크롤바는 본문 강조와 경쟁한다. 중립 램프에서 고른다 — 라이트 `gray-400`(hover `gray-500`), 다크 `gray-700`(hover `gray-600`).
5. 코드 블록·표의 가로 스크롤바도 같은 규칙을 따른다. 스크롤은 **해당 블록 안에서만** 일어나고 페이지 전체가 가로로 밀리지 않는다.
6. 스크롤바를 숨기지 않는다. 스크롤 가능한 영역은 보여야 한다.

---

## 3. 한국어 타이포그래피

**Pretendard Variable 한 가족으로 본문·제목·UI를 통일한다** [결정]. sprinters가 Pretendard Variable을 쓰고 사용자가 그 읽기 경험을 좋게 평가했다 [관찰, R3]. 코드에는 시스템 고정폭을 쓴다. 날짜·분류까지 고정폭으로 바꾸지 않는다.

Pretendard는 **아직 앱에 로드되지 않았다.** 현재 한국어는 `Apple SD Gothic Neo` / `Malgun Gothic` fallback으로 렌더링된다. 폰트 파일·서브셋·로딩 방식은 TBD이며, 로드 이후 행간과 줄바꿈을 다시 검수해야 한다. 공식 배포본: [Pretendard](https://github.com/orioncactus/pretendard).

### 타입 스케일 [제안]

| 이름        | 크기               | 행간 | 굵기 | 쓰는 곳             |
| ----------- | ------------------ | ---- | ---- | ------------------- |
| `display`   | 40px               | 1.25 | 700  | 홈 히어로           |
| `title`     | 32px (모바일 28px) | 1.35 | 700  | 페이지·글 제목      |
| `h2`        | 24px               | 1.5  | 700  | 본문 2단계 제목     |
| `h3`        | 18px               | 1.6  | 600  | 본문 3단계 제목     |
| `cardTitle` | 18px               | 1.45 | 700  | 글 카드 제목        |
| `body`      | 16px               | 1.8  | 400  | 본문                |
| `ui`        | 14px               | 1.5  | 500  | 버튼·탐색           |
| `meta`      | 14px               | 1.6  | 400  | 날짜·분류·요약      |
| `caption`   | 12px               | 1.4  | 500  | 태그·코드 언어 라벨 |
| `code`      | 14px               | 1.7  | 400  | 코드                |

근거와 조정:

- 본문 16px은 4개 사이트가 공통이다 [관찰]. **행간만 다르다** — 영문 사이트는 1.5(Tailwind, loke), sprinters도 1.5. 한국어 장문 기술 글은 **1.8로 올린다** [결정]. 이건 관찰값을 따르지 않은 의도적 결정이다.
- 카드 제목 18px/700은 sprinters의 `heading-3 18px w700 lh1.38`이 32건으로 가장 많이 관찰된 값이다 [관찰, R3].
- `caption` 12px은 sprinters에서 257건으로 압도적이다 [관찰, R3].
- 홈 히어로: loke는 `display 60px w700 lh1.0 ls-1.5px` [관찰, R4]. 한국어 60px에 행간 1.0은 받침이 잘리므로 **40px / 1.25**로 낮춘다 [결정].
- 자간은 영문 제목에서만 관찰된다(Expo `-0.352px`, loke `-1.5px`). **한국어 본문에는 음수 자간을 쓰지 않는다** [결정]. `display`의 `-0.02em`만 예외로 두고 실제 화면에서 확인한다.
- `text-*`와 `leading-*`는 Tailwind의 별개 네임스페이스다. `@theme`에서도 분리해 하나를 바꿔도 다른 쪽에 영향이 없게 한다.

### 본문 폭

`articleMax: 860px` — 현재 구현값을 유지한다. 다만 16px 한글에서 860px은 한 줄 약 54자다. **첫 글 상세를 열어 한 줄 자수를 세고, 50자를 넘으면 760px로 내린다.** 이 검수는 필수다.

긴 제목은 잘라내지 않는다. 단어 줄바꿈을 존중하되 긴 URL·식별자에는 넘침 방지를 적용한다. 양끝 정렬은 쓰지 않는다.

---

## 4. 간격·라운드·모션

- 간격은 4px 단위. 메타데이터 사이 8px, 관련 요소 12~16px, 블록 24px, 섹션 40~64px. 4개 사이트 모두 8px 스케일이 관찰됐다 [관찰].
- 라운드: 인라인 4px, 컨트롤 6px, 표면 8px, 카드 10px, 원형 pill. 8px은 4곳 모두에서 가장 많이 관찰된 값이다(Expo 32건, loke 33건, sprinters 85건, Tailwind `pre` 6건) [관찰]. 카드 10px은 loke 관찰값이다 [관찰, R4].
- 모션: **150ms**, `cubic-bezier(0.4, 0, 0.2, 1)`. 4개 사이트 전부 이 조합이 지배적이다 — Expo 65건, loke 40건, Tailwind 6건, sprinters 23건 [관찰]. 링크·버튼의 `color`, `background-color`, `border-color`, `outline-color`에만 적용한다. 등장 애니메이션은 쓰지 않는다.
- `prefers-reduced-motion: reduce`에서 transition·animation·smooth scroll을 모두 끈다.
- 그림자: 일반 표면은 그림자 없이 시작한다. 카드에 필요하면 `0 1px 2px rgba(0,0,0,0.05)` 하나만 쓴다 — loke의 관찰값과 같다 [관찰, R4]. 떠 있는 메뉴에는 `overlay` 하나를 추가한다.

---

## 5. 홈 화면 — loke.dev 배치

loke.dev의 정보 구성을 따른다. 추출 자료가 충분한 유일한 참고처다(`contentLength: 54,037`).

```text
데스크톱
[moriarchive]                    블로그  프로젝트  소개  [테마]
────────────────────────────────────────────────────────────
  안녕하세요, 조하은입니다.              ← display 40px/700
  프로젝트 경험과 개발하며 배운 내용을 기록합니다.   ← body 16px, secondary

  최근 글                                    전체 보기 →   ← h2 24px + ui 14px 링크
  ┌─ 글 카드 ─────────────────────────────────────────┐
  ┌─ 글 카드 ─────────────────────────────────────────┐
  ┌─ 글 카드 ─────────────────────────────────────────┐

  프로젝트                                   전체 보기 →
  ┌─ 프로젝트 항목 ────────────────────────────────────┐
```

- 섹션 사이 **64px**. loke의 최대 간격 관찰값이 64px(6건)이다 [관찰, R4].
- 각 섹션은 **`제목 왼쪽 + 전체 보기 링크 오른쪽`을 한 줄에 같은 베이스라인으로** 둔다 [관찰, R4 `loke-home.png`의 "Featured Projects / View all projects →"]. `SectionHeader` 컴포넌트(`src/components/common/section-header.tsx`)로 뽑아 홈의 두 섹션이 같은 규칙을 쓴다.
    - 링크는 `.arrow-link`다. 14px / 500 / secondary, 화살표 아이콘 16px를 8px 간격으로 뒤에 붙인다. loke의 `link 14px w500 lh1.43`(20건)과 같다 [관찰]. **글 상세 하단의 "… 글 더 보기"·"전체 글 보기"도 같은 클래스를 쓴다** — 목록으로 가는 링크는 사이트 어디서나 같아야 한다.
    - hover·focus에서 색이 `accent`로 가고 화살표가 2px 오른쪽으로 밀린다. 150ms `cubic-bezier(0.4, 0, 0.2, 1)` — loke의 `motion.contexts.link` 관찰값이다 [관찰]. 화살표 이동은 우리가 더한 것이다 [결정].
    - 좁은 화면에서는 `flex-wrap`으로 링크가 제목 아래로 내려간다.
- 히어로는 **문장 2줄**이다. 큰 홍보 배너, 자동 등장 애니메이션, 장식용 그라데이션, 의미 없는 숫자·통계는 넣지 않는다.
- 정보가 없는 프로젝트나 이력을 만들어 채우지 않는다.
- 홈 최대 폭은 `shellMax 1080px`. 본문 폭(860px)을 적용하지 않는다.
- 화면이 넓어도 **왼쪽 정렬**한다. 가운데 정렬 히어로를 쓰지 않는다.

**모바일** — 헤더는 `[메뉴] moriarchive [테마]`, 이하 세로 1열. 섹션 간격 40px.

---

## 6. 글 카드 — Sprinters 형식

`sprinters.run/categories/technology`를 재추출해(174KB) 실제 카드 값을 확보했다. 아래 [관찰]은 그 페이지의 실측이다.

```text
데스크톱 — auto-fill 그리드, 최소 260px
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   16:9 썸네일 │ │              │ │              │   radius 8px, 1px ring
├──────────────┤ ├──────────────┤ ├──────────────┤
│ 알고리즘 / DP │ │              │ │              │   caption 12px, secondary
│ 글 제목       │ │              │ │              │   18px / 700
│ 요약 2줄      │ │              │ │              │   14px, secondary
│ 날짜  #태그   │ │              │ │              │   caption 12px, tertiary
└──────────────┘ └──────────────┘ └──────────────┘
```

| 요소 | 값 | 출처 |
| --- | --- | --- |
| 그리드 | `repeat(auto-fill, minmax(260px, 1fr))`, 간격 32/24px | [제안]. Sprinters는 4열 고정, 우리는 글 수가 적어 auto-fill |
| **640px 미만** | **1열 + 가로 카드.** 썸네일 112px 왼쪽, 텍스트 오른쪽 | [결정]. 전체 폭 16:9를 쓰면 한 화면에 카드 2장뿐이라 목록이 스크롤만 길어진다 |
| 카드 라운드 | `8px` | Sprinters 69건으로 압도적 [관찰] |
| 썸네일 경계 | `box-shadow: 0 0 0 1px` ring (border 아님) | Sprinters가 `0 0 0 1px` ring을 21건 사용 [관찰] |
| 제목 | 18px / 700 / 1.4 | Sprinters `heading-3 18px w700 lh1.38` 21건 [관찰] |
| 요약 | 14px / 1.43, secondary, **2줄 제한** | Sprinters `body 14px lh1.43` 19건 [관찰] |
| 분류·날짜·태그 | 12px / 1.33 | Sprinters `caption 12px` 169건 [관찰] |
| 카드 내부 간격 | 8·12px | Sprinters 8px 69건, 12px 48건 [관찰] |
| 호버 | 썸네일 `scale(1.03)`, 300ms `ease-out` | Sprinters `motion.contexts.card`가 `transform/scale`, `0.3s`, `cubic-bezier(0,0,0.2,1)` [관찰] |

**우리가 다르게 한 것:**

- **작성자 행을 넣지 않는다** [결정]. Sprinters는 썸네일 아래 아바타+이름을 두지만 여기는 1인 블로그라 모든 카드에 같은 이름이 반복되면 잡음이다. 그 자리에 **분류 경로**를 넣는다.
- **좋아요·댓글 수를 넣지 않는다** [결정]. 없는 기능의 자리를 만들지 않는다.
- **분류별 색상을 쓰지 않는다** [결정]. Sprinters는 분류마다 다른 텍스트 색 6개(`--dictionary-category-0~5-text`)를 쓴다 [관찰]. 색을 6개 더하면 도토리 브랜드가 묻힌다. 분류는 텍스트로만 구분한다.
- **호버 확대는 채택했다** [결정]. v0.2에서는 "카드에 hover 이동이나 확대를 넣지 않는다"고 적었으나, 사용자가 Sprinters의 호버를 좋게 평가했고 관찰값도 있어 뒤집었다. 카드 전체가 아니라 **썸네일만** 확대하고 컨테이너가 잘라낸다. `prefers-reduced-motion`에서 꺼진다.

**규칙:**

- **카드 어디를 눌러도 글로 이동한다. 다만 카드를 `<a>`로 감싸지는 않는다** [결정]. 감싸면 링크의 접근성 이름이 "분류 + 제목 + 요약 + 날짜 + 태그" 전체가 되어 스크린리더에서 못 쓴다. 대신 **제목 링크의 `::after`를 카드 전체로 늘린다**(`position: absolute; inset: 0`). 링크 이름은 제목 하나, 탭 정지도 하나다.
    - hover는 카드 단위로 묶는다. 카드 어디에 올려도 제목이 `accent`로, 썸네일이 `scale(1.03)`으로 함께 반응한다.
    - 초점은 제목 링크가 받지만 표시는 카드에 준다(`:has(.text-link:focus-visible)`). 실제로 활성화되는 영역과 초점 표시가 일치해야 한다.
    - 썸네일의 중복 링크(`tabIndex={-1} aria-hidden`)는 없앴다. 늘어난 영역이 이미 덮으므로 불필요했다.
    - **대가:** 카드 안 텍스트를 드래그해 선택하기 어려워진다. 목록의 요약은 선택할 일이 드물어 감수한다.
- 태그에 필터 기능이 없으면 버튼처럼 보이게 하지 않는다. `#` 접두사를 붙인 작은 중립 텍스트까지만.
- **제목은 줄 수를 제한하지 않는다.** 요약만 2줄로 자른다. 긴 한국어 제목이 잘리면 안 된다.
- 썸네일이 없는 글도 정상 상태다. 현재는 `thumbnail`이 없으면 분류의 썸네일, 그것도 없으면 `default-thumbnail.png`로 넘어간다.
- **`sizes`를 반드시 지정한다.** 카드 폭이 뷰포트마다 달라서(모바일 112px / 태블릿 50vw / 데스크톱 33vw) `sizes` 없이는 화면 폭 기준의 과대한 이미지가 내려온다.
- **blur placeholder는 만들지 않는다** [결정, 2026-09-07]. 예약된 16:9 박스를 `--panel`로 채우는 것으로 빈 칸 깜빡임은 해결된다. 빌드 시 `blurDataURL`을 생성하는 방식은 스크립트·스키마·배선이 늘고 이미지 교체 시 낡는 실패 모드가 생기는데, 2026-09-07 기준 8편이 모두 같은 기본 썸네일을 쓰므로 페이지당 실제 이미지 요청이 1회뿐이라 얻는 것이 거의 없다. 글마다 다른 실제 이미지가 쌓이면 다시 검토한다.

## 6-1. 분류 화면

### 하위 분류 그룹 — 조건부 [결정]

Sprinters의 카테고리 페이지는 depth-1(`기술`) 아래 여러 depth-2 토픽(`Sprinters 구현일지`, `AI`, `Algorithm` …)을 각각 가로 캐러셀로 묶어 보여준다 [관찰, R3]. 우리는 **그 구조만 조건부로 채택하고 캐러셀은 만들지 않는다.**

- **글이 있는 하위 분류가 2개 이상일 때만** 그룹으로 나눈다. 1개면 헤딩이 한 겹 늘 뿐 아무것도 구분하지 않으므로 평평한 그리드로 둔다. 2026-09-07 기준 `알고리즘 → DP` 하나뿐이라 실제로는 평평하게 나온다.
- 그룹 헤더는 5절의 `SectionHeader`를 그대로 쓴다. 홈과 같은 규칙이 되고 새 컴포넌트가 필요 없다.
- 그룹당 **6편**까지 보이고 나머지는 헤더 오른쪽 링크로 그 하위 분류 페이지에 넘긴다. 캐러셀이 하는 공간 절약을 가로 스크롤 없이 달성한다.
- **가로 캐러셀을 만들지 않는다.** 키보드 이동·스크린리더·스와이프·위치 표시를 모두 구현해야 하는데, 지금 글 수로는 그리드로 전부 보인다. 필요해지면 그때 접근성 요구사항부터 정리한다.
- 하위 분류에 속하지 않고 이 분류에 직접 달린 글은 그룹 없이 맨 위에 둔다. **모든 글에는 분류가 있으므로 "미분류" 묶음은 만들지 않는다** [결정].

### 분류 칩

`/blog`의 대분류와 분류 페이지의 하위 분류는 같은 `CategoryNav`를 쓴다. pill 라운드, `line-strong` 테두리, 이름 옆에 글 수.

현재 분류는 `aria-current="page"` + `accent-surface` 배경 + 굵기를 **함께** 쓴다. 색 하나에 의존하지 않는다.

칩은 필터 컨트롤이 아니라 **각 분류 페이지로 가는 링크**다. 필터 기능은 구현 범위가 아니다.

### 이동 경로 [결정]

`Breadcrumb` 컴포넌트를 글 상세와 분류 페이지가 공유한다. 이전에는 두 화면이 각각 다른 마크업(`ChevronRight` vs `/` 문자)을 썼다.

**경로는 항상 분류 계층 전체를 보여준다.**

| 화면 | 경로 | 마지막 항목 |
| --- | --- | --- |
| `/blog/category/algorithm` | 블로그 > **알고리즘** | 현재 페이지 |
| `/blog/category/algorithm/dp` | 블로그 > 알고리즘 > **DP** | 현재 페이지 |
| 글 상세 | 블로그 > 알고리즘 > DP | 전부 링크. 글 제목은 h1 |

- **분류 페이지는 자기 자신을 경로에 포함한다.** 빼면 `/algorithm`과 `/algorithm/dp`의 경로가 `블로그 > 알고리즘`으로 같아져 어디 있는지 구분되지 않는다.
- 현재 페이지 항목은 **링크가 아니라 `aria-current="page"`가 붙은 텍스트**다. 자기 자신으로 가는 링크를 만들지 않는다. 색과 굵기로도 함께 구분한다.
- **글 상세는 글 제목을 경로에 넣지 않는다.** 긴 한국어 제목이 경로를 밀어내고 바로 아래 h1과 중복된다. 분류까지만 보여주고 전부 링크로 둔다.
- 마크업은 `<nav><ol><li>`다. 순서가 곧 계층이므로 WAI-ARIA breadcrumb 패턴대로 순서 있는 목록을 쓴다.

## 6-2. 앱 셸과 사이드바

### 스크롤 모델 [결정]

**문서 스크롤을 유지한다.** `body`가 스크롤하고 헤더만 `position: fixed`다. `main`만 스크롤하는 앱 셸로 바꾸면 Next가 내비게이션 때 `document.documentElement.scrollTop = 0`으로 스크롤을 초기화하는 로직이 무력화돼 직접 구현해야 하고, sticky 목차와 `scroll-padding-top`도 스크롤 컨테이너 기준으로 다시 짜야 한다. 얻는 것에 비해 위험이 크다.

대신 **메뉴를 헤더 밖으로 꺼냈다.** 이전에는 69px 고정 헤더 안에 메뉴가 들어 있어 항목이 많아지면 아래쪽에 닿을 수 없었다. 지금은 `<aside>`가 헤더의 형제이고 자기 스크롤을 갖는다.

### 사이드바 [결정]

| 폭 | 동작 |
| --- | --- |
| 770px 이상 | 왼쪽에 고정 컬럼(260px). **본문을 밀어낸다** |
| 769px 이하 | 밀지 않고 **본문 위에 떠서** 덮는다. 스크림 + 그림자 |

**메뉴 버튼은 로고 왼쪽, 헤더 맨 앞에 둔다** [결정]. 사이드바가 왼쪽에서 나오므로 여는 버튼도 그쪽에 있어야 한다. 트리거와 패널이 화면 반대편에 있으면 무엇이 열릴지 예측할 수 없다. Sprinters도 같은 배치다 [관찰, R3]. 오른쪽에는 주요 링크와 테마 전환만 남는다.

- `.shell`의 `--sidebar-offset` 하나로 제어한다. 열리면 `260px`, 오버레이 구간에서는 `0px`로 되돌린다. 본문·푸터가 `margin-left`로 따라 움직인다.
- 헤더는 항상 전체 폭이다. 사이드바는 헤더 아래에서 시작한다 — Sprinters와 같은 구성 [관찰, R3].
- **`<aside>`를 쓴다.** 보조 탐색이라는 의미가 마크업에 드러나야 한다.
- 닫기: 메뉴 버튼, Escape(버튼으로 포커스 복귀), 스크림 클릭.
- **링크 이동은 오버레이 구간에서만 닫는다** [결정]. 본문을 밀어내는 구간에서는 비켜줄 대상이 없고, 매번 닫히면 분류를 훑어보는 데 쓸 수 없다. 판정은 `matchMedia('(max-width: 769px)')`이며 그 문자열은 `sidebar-store.ts`에 두어 CSS 분기점과 한 곳에서 관리한다.
- 항목은 `분류명 + 글 수`이고 현재 항목은 `aria-current="page"` + `accent-surface` + 굵기를 함께 쓴다. 분류 칩과 같은 규칙이다.
- **220ms `cubic-bezier(0.4, 0, 0.2, 1)`로 슬라이드한다.** 사이드바는 항상 렌더링해 두고 `transform: translateX(-100%)`로 밀어 두며, 닫힌 동안에는 `inert`로 초점과 접근성 트리에서 뺀다. 본문의 `margin-left`도 같은 시간으로 따라간다. `prefers-reduced-motion`에서 꺼진다.
- **상태는 `sessionStorage`에 저장한다** [결정]. 상태 라이브러리는 쓰지 않는다 — 불리언 하나이고 이를 읽는 컴포넌트도 하나뿐이라 zustand를 더할 이유가 없다. 다만 마운트 시 스토리지를 읽는 일은 effect에서 `setState`를 부르게 되어(`react-hooks/set-state-in-effect`) 금지되므로, `useSyncExternalStore`로 읽는 작은 모듈 스토어(`src/lib/sidebar-store.ts`)를 둔다. 서버와 첫 클라이언트 스냅샷이 모두 `false`라 하이드레이션이 어긋나지 않는다.
- 오버레이 구간에서 배경 스크롤을 잠그지 않는다(TBD). 스크림과 Escape로 충분한지 실제 화면에서 판단한다.

## 7. 글 상세

```text
데스크톱
[moriarchive]                    블로그  프로젝트  소개  [테마]
────────────────────────────────────────────────────────────
             블로그 / 알고리즘 / DP        ← breadcrumb, secondary
             글 제목                       ← title 32px
             요약 / 날짜 / 태그             ← meta
             목차                          ← panel, 라운드 8px
             본문 860px
             코드·표·이미지
             ─────────────
             같은 분류의 글 / 전체 글
```

| 블록        | 기준                                                                    |
| ----------- | ----------------------------------------------------------------------- |
| 본문 문단   | 16px / 1.8, 아래 여백 20px                                              |
| `h2`        | 24px / 1.5, 위 40px · 아래 16px                                         |
| `h3`        | 18px / 1.6, 위 24px · 아래 12px                                         |
| 코드 블록   | 라운드 8px, 패딩 16px, 코드 14px/1.7. Tailwind가 `pre`에 8px [관찰, R2] |
| 인라인 코드 | `panel` 배경, 라운드 4px, `0.9em`                                       |
| 목차        | `panel` 배경, 라운드 8px, h2·h3 2단계, 들여쓰기 20px                    |
| 인용문      | `accent` 3px 세로선 + secondary 텍스트                                  |
| 표          | 블록 내부에서만 가로 스크롤                                             |

**정렬: 왼쪽 정렬로 확정한다** [결정]. Sprinters 글 상세는 날짜·제목·부제를 모두 **가운데 정렬**한다 [관찰, R3 sp-record 스크린샷]. 참고했지만 채택하지 않는다. 가운데 정렬은 제목 길이에 따라 시작점이 흔들려 목록·breadcrumb·본문과 왼쪽 축이 어긋나고, 한국어 긴 제목에서 특히 불안정하다. 우측 목차와 한국어 조판만 참고한다.

**고정 헤더 대응:** `<html>`에 `scroll-padding-top: calc(헤더 높이 + 16px)`을 둔다. 목차 앵커, 브라우저 찾기, Next의 내비게이션 스크롤이 모두 이 값을 존중하므로 요소별 `scroll-margin-top`보다 낫다.

**내비게이션 초기 스크롤** [결정, 2026-09-07]. 목록에서 글로 들어올 때 제목이 헤더에 가리는 문제가 있었다. `node_modules/next/dist/client/components/layout-router.js`를 읽어 원인을 확인했다 — Next는 먼저 `htmlElement.scrollTop = 0`을 실행하고, 그래도 대상이 뷰포트에 없으면 `domNode.scrollIntoView()`로 넘어간다. 그런데 `<html>`에 `scroll-behavior: smooth`만 있고 **`data-scroll-behavior="smooth"` 속성이 없으면** Next가 전환 중 부드러운 스크롤을 끄지 못한다(`disable-smooth-scroll.js`). 그러면 `scrollTop = 0`이 애니메이션으로 처리돼 직후 측정이 옛 위치를 읽고, `scrollIntoView()` 분기로 빠져 글 상단이 고정 헤더 **아래**에 박힌다.

- `<html>`에 `data-scroll-behavior="smooth"`를 넣는다. 전환 중에는 즉시 스크롤, 문서 내 앵커에는 부드러운 스크롤이 유지된다.
- **스크롤 자체는 필요하다.** 목록을 내려보다 글을 열면 초기화하지 않는 한 본문 중간에 떨어진다. 다만 목표 지점은 "글 요소의 top"이 아니라 **문서 최상단(0)**이어야 한다. 글 위에는 항상 보이는 고정 헤더뿐이라 건너뛸 것이 없고, 글 top에 맞추면 오히려 내용이 헤더에 가린다. `scroll-padding-top`이 `scrollIntoView` 분기로 빠지는 경우까지 보정한다.

### 목차 배치 [결정]

Sprinters 글 상세가 우측 목차를 쓴다 [관찰, R3 `sp-record.png`].

**목차는 본문의 폭을 가져가지 않는다.** `.article`은 어느 폭에서든 860px 그대로 가운데에 있고, 목차는 그 바깥 여백에 `position: absolute`로 떠 있다(`.toc-rail`). 목차가 생겨도 본문 열의 폭과 위치가 변하지 않는다.

**뷰포트가 아니라 `.shell-content`의 폭으로 판단한다.** `container: shell / inline-size` + `@container shell (min-width: 1380px)`. 사이드바가 열려 자리가 줄면 목차가 스스로 본문 위 박스로 돌아온다. 미디어 쿼리로는 사이드바 상태를 알 수 없다.

임계값 `860 + 2 × (40 + 220) = 1380`은 **본문 좌우 양쪽에 목차 자리를 확보**한 값이다. 한쪽만 계산하면 본문이 왼쪽으로 밀린다.

| 뷰포트 | 사이드바 닫힘 | 사이드바 열림 |
| --- | --- | --- |
| 1280px | 본문 위 박스 | 본문 위 박스 |
| 1440px | **여백에 부유** | 본문 위 박스 |
| 1920px | **여백에 부유** | **여백에 부유** |

- 여백의 목차는 **패널 배경을 쓰지 않는다.** 채워진 상자가 본문과 경쟁한다.
- **색은 본문보다 한 단계 연하다.** 목차 본체는 `text-secondary`, 제목은 `text-tertiary`. 읽는 대상이 아니라 이동 보조 장치다. hover에서만 `accent`로 올라온다.
- sticky 위치는 `헤더 높이 + 16px`. 뷰포트보다 길어지면 잘라내지 않고 목차 안에서 스크롤한다.
- **부유할 때 목차의 top은 breadcrumb이 아니라 h1에 맞춘다.** `calc(var(--text-meta) * var(--leading-meta) + var(--spacing-6))` — breadcrumb 한 줄 높이 + 제목의 위 여백. 값을 박아 넣지 않아 메타 크기가 바뀌면 따라간다.
- 좁은 화면에서는 `.toc-rail`이 `display: contents`가 되어 목차가 흐름 안 제자리로 돌아온다.

### 읽는 위치 표시 [결정]

스크롤에 따라 지금 보고 있는 섹션을 목차에서 표시한다. `src/components/blog/toc.tsx`.

- **판정 기준은 "읽기 선을 마지막으로 지나친 제목"**이다. 화면에 제목이 하나도 없는 긴 섹션 안에서도 정확하다.
- **마지막 화면에서는 읽기 선이 내려온다** [결정]. 문서 끝에서는 남은 제목들을 헤더 밑까지 끌어올릴 스크롤이 없다. 그래서 남은 스크롤이 한 화면 미만이 되면 선이 아래로 쓸려 내려가되 **뷰포트의 55% 지점에서 멈춘다**. 처음에는 "바닥에 닿으면 마지막 제목"으로 처리했는데, 마지막 화면에 섹션이 여러 개 보이면 무조건 맨 아래로 튀는 문제가 있었다. 지금은 화면 가운데를 채운 섹션이 선택된다. 55%는 조정 가능한 값이며, 무엇을 읽고 있는지에 정답은 없다.
- 표시는 `aria-current="location"`이다. `page`는 현재 **페이지**를 가리키는 링크에 쓰므로 여기에는 맞지 않다.
- 표시는 **색 + 굵기 + 왼쪽 세로선**을 함께 쓴다. 색 하나에 의존하지 않는다.
- 스크롤 핸들러는 `passive`이고 `requestAnimationFrame`으로 묶는다.
- **JavaScript 없이도 목차는 그대로 동작한다.** 강조만 사라진다.

## 8. 컴포넌트 규칙

| 대상        | 기본 형태                              | 상태·동작                                                                                                 |
| ----------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 전역 메뉴   | 상단 메뉴 버튼, 2단계 카테고리와 글 수 | `aria-expanded`, Escape로 닫고 버튼에 포커스 복귀, 링크 이동 후 닫기                                      |
| 아이콘 버튼 | Lucide 20px(보조 16px), 선 1.75        | **클릭 영역 44px 확보**(20px 아이콘 + 12px 패딩), `currentColor`, 접근성 이름, hover·focus 표시, ref 전달 |
| 테마 전환   | 아이콘 버튼                            | 현재 테마를 접근성 이름에 반영                                                                            |
| 글 카드     | 6절                                    | 제목 링크만 초점                                                                                          |
| 태그        | 작은 중립 텍스트 또는 옅은 표면        | 필터 없으면 비대화형                                                                                      |
| 목차        | `panel`, 라운드 8px                    | 앵커 이동. 현재 섹션 표시를 넣으면 스크롤·키보드 모두 검증                                                |
| 코드 블록   | 라운드 8px, 패딩 16px                  | Shiki light/dark 유지, 가로 스크롤, 복사 성공·실패 피드백                                                 |
| 복사 버튼   | 3차 텍스트, hover에서 본문 텍스트      | **성공 아이콘은 `accent`를 쓴다.** 실패는 기본색 X 아이콘과 스크린 리더 상태 안내로 구분한다. 별도 오류 색은 추가하지 않는다. |
| 인용·표     | accent 세로선, 중립 경계               | 의미를 색 하나에 의존하지 않음                                                                            |
| 빈 상태     | 짧은 이유 + 실제 가능한 이동 링크      | 가짜 데이터·검색·작성 버튼 만들지 않음                                                                    |
| 오류 화면   | 문제 설명 + 재시도·목록 이동           | 키보드 접근, 기술 오류 원문 노출 금지                                                                     |

**공통:**

- 컴포넌트는 개별 HEX나 `gray-200` 같은 원시 단계가 아니라 `--panel`, `--line`, `--text-secondary` 같은 **역할 변수**를 참조한다.
- 포커스는 `3px` `accent` 외곽선 + `4px` offset. 전역 `:focus-visible` 하나로 처리한다.
- hover만으로 정보를 전달하지 않는다. 포커스에서도 같은 의미가 보여야 한다.
- 전역 요소 선택자(`header`, `section`, `button`)와 무스코프 속성 선택자(`[aria-current='page']`)를 쓰지 않는다. 범위를 좁힌다.
    - `.header-row > button` 같은 자손 요소 선택자도 마찬가지다. 특정성이 `(0,1,1)`이라 `.menu-button`(`(0,1,0)`) 같은 클래스 규칙을 조용히 덮는다. 실제로 헤더 버튼 순서가 이 때문에 적용되지 않았다. **역할이 다른 요소는 각자 클래스를 갖는다.**

---

## 9. 추출 자료 재수집 계획

현재 자료로는 이 문서의 목표(다크 모드, 카테고리 카드)를 뒷받침할 수 없다. dembrandt는 기본적으로 **URL 하나의 렌더된 DOM 스냅샷**을 저장한다. `meta.requestedUrl`이 그대로 기록되고 모든 수치가 그 페이지의 실제 엘리먼트에서 나오므로, **경로를 포함한 정확한 URL로 다시 뽑아야 한다.**

### 도구 사용법

명령 문법, 같은 도메인의 여러 페이지를 뽑는 세 가지 방법(`paths` / `--crawl` / `--sitemap`), 쓰면 안 되는 옵션, 추출 후 확인 절차는 [.local-docs/design-site/EXTRACTION.md](.local-docs/design-site/EXTRACTION.md)에 정리했다. 핵심만 옮기면:

- **`--dark-mode`가 있다.** 이 문서의 다크 값을 관찰로 뒷받침할 수 있게 된다. 라이트와 다크는 한 번에 못 얻으므로 같은 URL을 두 번 실행한다.
- **`--screenshot`으로 카드·레이아웃 구조를 본다.** `components`에 card 카테고리가 없어 구조는 JSON으로 안 나온다.
- **여러 페이지를 넣으면 결과가 하나로 병합된다.** 어느 값이 어느 페이지에서 왔는지 사라지므로, sprinters 홈과 카테고리는 **따로** 뽑아야 글 카드 값을 구분할 수 있다. 반대로 Expo는 사이트 전체 색 체계가 목적이라 병합이 맞다.
- **`--design-md`와 `--tailwind`는 쓰지 않는다.** 전자는 이 문서를 덮어쓸 위험이 있고, 후자는 관찰값만 담아 도토리 팔레트를 잃는다.

### 재추출 목록

| 우선순위 | 대상                                  | 방법                                           | 이유                                         |
| -------- | ------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| 1        | `sprinters.run/categories/technology` | 단일 페이지, 라이트 + `--mobile`               | 글 카드가 홈 자료에 없음                     |
| 2        | `docs.expo.dev`                       | `--sitemap --crawl 10`, 라이트 + `--dark-mode` | 루트 스냅샷이 3,857바이트로 사실상 비어 있음 |
| 3        | `nextjs-mdx-blog.loke.dev/`           | 단일 페이지, `--dark-mode`                     | 홈 배치 참고처의 다크 확인                   |
| —        | Tailwind 내지                         | —                                              | 재추출 불필요. 이미 내지를 뽑음              |

먼저 작업 폴더로 이동한다.

```powershell
Set-Location C:\Users\jhe93\Desktop\moriarchive\.local-docs\design-site
```

**1. sprinters 글 카드** — 홈과 섞이지 않게 따로, 데스크톱과 모바일.

```powershell
pnpm dlx dembrandt "https://www.sprinters.run/categories/technology" --save-output --screenshot output/sprinters.run/tech-desktop.png
pnpm dlx dembrandt "https://www.sprinters.run/categories/technology" --mobile --save-output --screenshot output/sprinters.run/tech-mobile.png
```

**2. Expo 문서** — 사이트 전체 색 체계가 목적이므로 병합 크롤. 라이트와 다크.

```powershell
pnpm dlx dembrandt "https://docs.expo.dev/" --sitemap --crawl 10 --save-output --wcag --screenshot output/docs.expo.dev/docs-light.png
pnpm dlx dembrandt "https://docs.expo.dev/" --sitemap --crawl 10 --dark-mode --save-output --screenshot output/docs.expo.dev/docs-dark.png
```

**3. loke 홈 다크** — 홈 배치 참고처.

```powershell
pnpm dlx dembrandt "https://nextjs-mdx-blog.loke.dev/" --dark-mode --save-output --screenshot output/nextjs-mdx-blog.loke.dev/home-dark.png
Set-Location C:\Users\jhe93\Desktop\moriarchive
```

### 재추출해도 얻을 수 없는 것

- **hover 상태** — `components`의 `hover`가 4개 파일 전부 `null`이다.
- **스크롤바** — 추출기 스키마에 항목 자체가 없다. 2절의 스크롤바 값은 재추출 후에도 [결정]으로 남는다.
- **카드의 배치 구조** — `components`에 card 카테고리가 없다. `--screenshot`으로 눈으로 보고 옮긴다.

### 다크 값을 얻은 뒤 할 일

`--dark-mode` 결과가 나오면 2절의 다크 램프를 **관찰과 대조**한다. 다만 Expo의 다크 hex를 그대로 채택하지 않는다. 우리 램프가 이미 대비를 통과했으므로 **비교해서 배울 것은 단계 간 간격과 표면 분리 폭**이다. 값을 바꾸면 2절의 대비 표를 다시 계산한다.

원본 JSON은 수정하지 않는다. `.local-docs`가 없는 환경에서도 이 문서의 관찰 요약과 토큰만으로 작업을 이어갈 수 있어야 한다.

---

## 10. 구현 순서

1. ~~**토큰 정리**~~ — 완료. 램프·역할 변수·텍스트 3단계·`line`/`line-strong` 분리·스크롤바 규칙까지 반영했다.
2. **글 상세** — 7절 적용. `scroll-margin-top`을 헤더 높이에 맞추고, 복사 버튼 성공 아이콘을 `accent`로 교체.
3. **글 카드·목록** — 6절 적용.
4. **홈** — 5절 적용.
5. **탐색·프로젝트·소개·예외 화면** — 같은 토큰으로 확장.
6. **검수 후 문서 갱신** — 바꾼 값과 이유를 이 문서에 반영하고 확정된 항목의 표기를 [제안] → [결정]으로 옮긴다.

### v0.1에서 이월된 수정 항목 — 2026-09-07 처리 완료

아래는 모두 `src/app/globals.css`와 컴포넌트에 반영했다. `pnpm lint`·`typecheck`·`build` 통과, 빌드된 CSS에서 토큰 값도 확인했다.

- [x] 다크 표면 붕괴 → `bg gray-950` / `surface·panel gray-900` / `hover-surface gray-800`으로 3단 분리 → 목차·태그·인라인 코드 배경이 안 보임.
- [x] `body` 배경을 `--bg`로 변경. 헤더와 층 방향이 일치 → 다크에서 헤더가 본문보다 어두움.
- [x] `--surface`를 `.skip` 배경에 사용. `--surface-soft`는 삭제
- [x] `--muted`·`--fg`·`--text-disabled` 별칭 삭제. `--text-primary/secondary/tertiary` 한 벌만 사용
- [x] `scroll-margin-top: calc(var(--site-header-height) + var(--spacing-4))`
- [x] 복사 성공 아이콘에 `.text-accent` 클래스를 정의해 테마별로 뒤집히게 함
- [x] `.button` 테두리를 `--line-strong`으로 (라이트 3.19 / 다크 3.72)
- [x] `[aria-current]`를 `.primary-nav` / `.menu-panel` 안으로 한정
- [x] 미정의 클래스 6개(`muted-link`, `menu-link`, `nav-link`, `plain-list`, `post-list`, `footer-copy`) 정의 추가
- [x] 죽은 `hover:text-primary` 제거. `.copy-button:hover`로 대체
- [x] `IconButton`을 `.icon-button` 클래스로 교체 — 44px 클릭 영역, `--hover-surface` 역할 참조
- [x] Shiki 규칙을 3개로 정리하고 하드코딩 hex 제거. 표면은 우리 토큰, 토큰 색은 Shiki
- [x] `.card-title`에 `--text-card-title`(18px/1.45) 적용
- [x] `--spacing-1~16`은 **유지**한다. 컴포넌트 CSS가 `var(--spacing-N)`을 직접 참조하므로 선언이 없으면 전부 깨진다. Tailwind 유틸리티와 값이 같은 건 의도다

---

## 10-1. 코드 구조

### 경로 별칭 [결정]

Next는 `tsconfig.json`의 `paths`를 그대로 지원한다 [문서 확인, `01-app/01-getting-started/01-installation.md`].

```json
"paths": { "@/*": ["./src/*"], "@content/*": ["./content/*"] }
```

`@/*`는 `create-next-app`의 기본값과 같다. `content/`는 `src/` 밖이라 별칭을 따로 둔다. `tests/`·`scripts/`도 같은 별칭을 쓰며 `tsx`가 해석한다.

### 배럴 [결정, 주의]

**이 버전 문서는 배럴을 권하지 않는다.**

> "Barrel files … can slow down builds because the compiler has to parse them to find if there are side-effects. Try to import directly from specific files when possible." — `01-app/02-guides/local-development.md`

`experimental.optimizePackageImports`는 `node_modules` 패키지용이라 로컬 배럴에는 적용되지 않는다. Turbopack은 자체 분석으로 어느 정도 완화한다.

그래서 배럴을 **폴더 단위로만, 서버/클라이언트 경계를 넘지 않게** 둔다.

| 배럴 | 안전 범위 |
| --- | --- |
| `@/components/common` | 양쪽 모두. 클라이언트 컴포넌트도, `node:` 임포트도 없다 |
| `@/components/blog` | **서버 전용.** `post-list`가 `node:fs`를 쓰는 `lib/content/posts`에 닿는다 |
| `@/components` | 셸·페이지 컴포넌트. 하위 폴더는 다시 내보내지 않는다 |
| `@/lib/content` | **서버 전용.** `node:fs` |

- 하위 폴더를 다시 내보내는 중첩 배럴은 만들지 않는다. 파싱 비용이 그만큼 커진다.
- **`@/lib` 최상위 배럴은 만들지 않는다.** 클라이언트가 쓰는 `sidebar-store`와 서버 전용 `content`가 한 배럴에 섞이면 클라이언트 번들이 `node:fs`를 끌어온다.
- 클라이언트 컴포넌트는 서버 전용 배럴을 거치지 말고 파일을 직접 임포트한다.

## 11. 검수 기준

- **폭:** 360 / 768 / 1280px에서 긴 한글 제목, 코드, 표, 이미지 확인.
- **테마:** 라이트·다크 모두. 특히 목차·태그·인라인 코드·코드 블록의 배경이 본문 배경과 구분되는지.
- **스크롤바:** 페이지·목차·코드 블록·표 각각에서 테마를 따라가는지, 가로 스크롤이 블록 밖으로 새지 않는지.
- **자수:** 본문 한 줄이 50자를 넘지 않는지.
- **키보드:** Tab · Enter · Escape, 본문 바로가기, 메뉴 포커스 복귀, 목차 앵커가 헤더에 가리지 않는지, 코드 복사.
- **대비:** 2절 표의 조합을 실제 화면에서 재확인. 새 조합을 추가하면 계산해서 표에 넣는다.
- **모션:** 사용자 동작에 대한 응답에만. `prefers-reduced-motion` 존중.
- **빌드:** `pnpm check` 후 `pnpm start`에서 프로덕션 CSS 확인.

검수 재료는 `dp-introduction.mdx`나 `boj-2579-stair-climbing.mdx` 같은 실제 길이의 한국어 초안이다. **디자인 검수를 위해 초안의 공개 상태를 바꾸지 않는다.** `pnpm dev:demo`는 `tests/fixtures/posts`를 읽으므로 예제 검수에 쓸 수 있고, 실제 초안이 필요하면 공개 데이터와 분리한 검수용 사본을 만든다.

---

## 12. 글 안의 강조와 MDX

**콘텐츠의 의미와 시각 효과를 분리한다.** 기본 강조 수단은 `**굵게**`, 인라인 코드, 인용문이다. `.prose strong`은 굵기로만 강조하고, `.prose a`는 링크 역할의 accent를 쓴다. 코드 내부 span은 Shiki가 관리하므로 일반 강조 스타일로 덮어쓰지 않는다.

별도의 색 강조가 정말 필요하면 그때 `.prose .text-accent`를 정의한 뒤 `<span className="text-accent">내용</span>`을 허용한다. **이름만 존재하는 클래스를 글에 미리 퍼뜨리지 않는다.** 중요한 정보는 색 없이도 문장과 굵기로 구분되어야 한다. 주의·팁이 반복되면 Callout 도입을 검토한다.

글의 스크린샷은 원본 비율을 유지하고 잘라내지 않는다. 목록 썸네일의 `object-fit: cover`를 본문 이미지에 적용하지 않는다.

---

## 13. 아직 정하지 않은 것

| 항목                       | 상태           | 다음 결정 기준                                  |
| -------------------------- | -------------- | ----------------------------------------------- |
| 폰트 파일 구성·로딩 방식   | TBD            | 공식 배포본 용량, 한글 서브셋, 로딩 전후 줄바꿈 |
| 본문 폭 860 vs 760         | 제안           | 첫 글 상세의 한 줄 자수                         |
| 모바일 접이식 목차         | TBD            | 기본 목차가 글 시작을 지나치게 밀어내는지       |
| 채워진 버튼(`primary-600`) | TBD            | 실제로 주요 동작 버튼이 필요해질 때             |
| 브랜드 마크·대표 이미지    | TBD            | 사용자가 선택한 실제 자산                       |
| 비활성 컨트롤 색           | TBD            | 실제 disabled 컨트롤이 생길 때                  |
| 검색·태그 필터·구독        | 구현 범위 아님 | 별도 기능 요구가 생겼을 때                      |

---

## 근거 파일

**2026-09-07 재추출 (14건).** 파일명이 곧 라벨이다.

| 라벨                                      | URL                                | len     | 비고                                                   |
| ----------------------------------------- | ---------------------------------- | ------- | ------------------------------------------------------ |
| `sprinters.run/sp-cat-tech`               | `/categories/technology`           | 174,223 | **글 카드 근거**                                       |
| `sprinters.run/sp-home`                   | `/`                                | 66,413  |                                                        |
| `sprinters.run/sp-record`                 | `/records/@vintz/35-917Wu4Lpj2`    | 63,130  | 로그인 모달이 떠 색이 일부 오염                        |
| `sprinters.run/sp-topic`                  | `/?topic=...`                      | 62,914  | 2depth                                                 |
| `nextjs-mdx-blog.loke.dev/loke-home`      | `/`                                | 54,037  | 홈 배치·모션                                           |
| `nextjs-mdx-blog.loke.dev/loke-projects`  | `/projects`                        | 18,157  | 카드 디자인                                            |
| `nextjs-mdx-blog.loke.dev/loke-about`     | `/about`                           | 16,977  | 후속 참고                                              |
| `nextjs-mdx-blog.loke.dev/loke-blog`      | `/blog`                            | 15,586  |                                                        |
| `docs.expo.dev/expo-tut2-light` · `-dark` | `/tutorial/add-navigation/`        | 12,428  | 다크 렌더 ✓, JSON 색은 라이트                          |
| `docs.expo.dev/expo-tut1-light` · `-dark` | `/tutorial/create-your-first-app/` | 9,715   | 다크 렌더 ✓, `semantic`만 다크 캡처                    |
| `docs.expo.dev/expo-tut1-cdp-dark`        | 같은 URL, CDP + 테마 `Dark`        | 9,715   | **가장 신뢰할 다크 스크린샷.** JSON 색은 여전히 라이트 |

`--mobile` 결과 2건과 CDP 라이트 중복 다수는 삭제했다.

각 JSON 옆에 같은 이름의 `.png` 뷰포트 스크린샷이 있다.

**이번 추출에서 확인된 도구 한계:**

- **`--mobile`이 동작하지 않는다.** `sp-cat-tech`와 `sp-cat-tech-mobile`의 `colors`·`typography`·`spacing`·`borderRadius`·`components`가 전부 해시까지 동일하고 스크린샷도 1920×1080이다. **반응형은 추출로 확인할 수 없다.** 브라우저에서 직접 본다.
- **다크 색은 추출로 얻을 수 없다.** 화면은 다크로 정상 렌더링된다 — `--dark-mode`로도, CDP로 테마를 `Dark`로 고정한 `expo-tut1-cdp-dark`(테마 토글이 `Dark`로 찍힘)에서도 그렇다. **그런데 세 경우 모두 JSON의 `palette`/`detected`에 다크 색이 하나도 없다**(`라이트에 없던 새 색: []`). 추출기가 색을 계산된 스타일이 아니라 스타일시트에서 읽는 것으로 보인다. 유일하게 건진 다크 실측은 `expo-tut1-dark`의 `semantic` 한 줄이다: `background #111113`, `secondary #18191b`, `text #ffffff`, `primary(링크) #70b8ff`, `accent #d19dff`. **다크는 스크린샷으로만 참고한다.**
- **다크 코드 블록은 밝은 쪽으로 확정했다** [결정, 2026-09-07]. Expo 다크는 코드 블록을 페이지 배경보다 **더 어둡게** 두지만(`expo-tut1-cdp-dark.png` [관찰]), 우리는 `panel #1F1F1F`를 `bg #141414`보다 **밝게** 간다. 화면을 비교한 뒤 사용자가 연한 쪽을 선택했다. Expo를 따르지 않는 두 번째 지점이다.
- **모달이 추출을 오염시킨다.** dembrandt가 hover·상호작용을 탐색하면서 Sprinters 로그인 모달과 Expo 피드백 모달을 열었다. 두 파일의 색·타이포에 모달 값이 섞여 있다.

기존 2026-09-06 추출:

- [R1 Expo 추출 JSON](.local-docs/design-site/output/docs.expo.dev/2026-09-06T13-22-16-163Z_v0.31.1.json) — `contentLength: 3,857`. 얇음
- [R2 Tailwind 추출 JSON](.local-docs/design-site/output/tailwindcss.com/2026-09-06T13-22-45-159Z_v0.31.1.json) — 내지, `196,348`
- [R3 Sprinters 추출 JSON](.local-docs/design-site/output/sprinters.run/2026-09-06T13-23-32-091Z_v0.31.1.json) — 홈만, `66,411`
- [R4 loke 추출 JSON](.local-docs/design-site/output/nextjs-mdx-blog.loke.dev/2026-09-06T13-24-07-283Z_v0.31.1.json) — 홈, `54,037`
- [추출 가이드](.local-docs/design-site/EXTRACTION.md) — dembrandt 사용법, 다중 페이지 추출, 추출 후 확인 절차
- [자료 가이드](.local-docs/design-site/README.md) · [요구사항 템플릿](.local-docs/design-site/requirements/TEMPLATE.md)
- [현재 CSS](src/app/globals.css) · [글 상세](src/app/blog/[slug]/page.tsx) · [글 목록](src/components/blog/post-list.tsx)
- [frontend-design 스킬](.agents/skills/frontend-design/SKILL.md)

## 변경 기록

- **2026-09-07 v0.11** — `@/`·`@content/` 별칭으로 전면 전환하고 폴더 단위 배럴 4개를 추가(서버/클라이언트 경계 준수). 글 상세 하단 링크를 `.arrow-link`로 통일(`.section-link`에서 개명). 카드 전체를 클릭 가능하게 하고 hover·focus를 카드 단위로 묶었다. 목차의 "바닥에서 마지막 제목 강제" 로직을 읽기 선 스윕으로 교체.
- **2026-09-07 v0.10.1** — 헤더의 `.header-row > button` 규칙이 특정성으로 `.menu-button`의 `order`를 덮어 메뉴 버튼이 왼쪽으로 가지 않던 문제 수정. 테마 버튼에 `.theme-toggle` 클래스를 주고 요소 선택자를 없앴다.
- **2026-09-07 v0.10** — 사이드바 링크가 데스크톱에서도 닫히던 문제 수정(오버레이 구간에서만 닫음). 목차에 읽는 위치 표시 추가(`aria-current="location"`, 색·굵기·세로선). 부유 목차의 top을 h1에 정렬. `clean`/`reinstall` 스크립트 추가.
- **2026-09-07 v0.9** — 메뉴 버튼을 로고 왼쪽으로 옮기고 사이드바에 220ms 슬라이드를 넣었다. 열림 상태를 `sessionStorage`에 저장(모듈 스토어 + `useSyncExternalStore`, zustand 미사용). 목차를 `.toc-rail`로 본문 바깥 여백에 띄워 본문 폭·위치를 건드리지 않게 하고 색을 한 단계 낮췄다. 목차 판단 기준을 `.shell-content` 1380px로 조정 — 이전 그리드 방식은 `grid-row: 1 / -1`이 암시적 행에서 1행으로 해석돼 breadcrumb 행이 목차 높이만큼 늘어나 제목이 밀려 있었다.
- **2026-09-07 v0.8** — 헤더 안에 갇혀 스크롤되지 않던 메뉴를 `<aside>` 사이드바로 분리했다. 770px 이상에서는 본문을 밀고, 이하에서는 스크림과 함께 덮는다. 목차 분기를 뷰포트 미디어 쿼리에서 **본문 영역 컨테이너 쿼리**로 바꿔 사이드바 개폐에 자동으로 반응하게 했다. `Navigation`을 `AppShell`로 대체.
- **2026-09-07 v0.7** — 1280px 이상에서 목차를 본문 오른쪽 여백의 sticky 사이드로 옮기고, 그 폭을 확보하려 셸을 1200px로 넓혔다. 목차 위 여백을 32 → 24px로 줄이고 `.tags`의 브라우저 기본 여백을 제거했다. 목차 제목을 `.toc-title`(14px)로 분리. 헤더·푸터 거터를 본문과 정렬(이전에는 20px 어긋나 브랜드가 제목보다 왼쪽에 있었다).
- **2026-09-07 v0.6** — 카드에 반응형 크기 규칙 추가. 640px 미만에서 썸네일 112px 가로 카드로 전환하고 `sizes`를 뷰포트별로 맞췄다. blur placeholder는 만들지 않기로 결정하고 근거를 기록.
- **2026-09-07 v0.5.1** — breadcrumb이 분류 계층 전체를 보여주도록 수정. 분류 페이지가 자기 자신을 빼면 상위 분류와 경로가 같아져 위치를 구분할 수 없었다. 현재 항목은 `aria-current="page"` 텍스트로 두고, 마크업을 `<ol>`로 바꿨다.
- **2026-09-07 v0.5** — 분류 화면 정리. `Breadcrumb`·`CategoryNav`를 공용 컴포넌트로 분리하고 `/blog`·분류 페이지에 토큰을 적용했다. 하위 분류 그룹은 **자식이 2개 이상일 때만** 나뉘도록 조건부로 구현하고(그룹당 6편 상한, `SectionHeader` 재사용) 가로 캐러셀은 만들지 않기로 했다.
- **2026-09-07 v0.4.1** — 섹션 헤더를 `SectionHeader` 컴포넌트로 분리. loke.dev처럼 제목 왼쪽·전체 보기 링크 오른쪽을 한 베이스라인에 배치하고 화살표 hover를 추가. 쓰이지 않게 된 `.muted-link` 제거.
- **2026-09-07 v0.4** — 글 카드를 Sprinters 카테고리 페이지 실측 기반의 세로 그리드로 재작성(`auto-fill minmax(260px)`, 썸네일 ring, 제목 18/700, 요약 2줄, caption 12px). 썸네일 호버 확대를 채택해 v0.2의 "확대 금지" 규칙을 뒤집었다. 내비게이션 초기 스크롤 버그를 Next 소스 확인 후 `data-scroll-behavior` + `scroll-padding-top`으로 해결.
- **2026-09-07 v0.3.2** — 화면 확인 후 조정. 다크 코드 블록을 배경보다 밝은 쪽으로 확정(Expo와 반대). `hr`을 `--line` 2px으로 정의 — Tailwind preflight가 `border-color: inherit`를 남겨 본문 텍스트 색을 상속하고 있었다(라이트에서 거의 검은 줄, 다크에서 흰 줄). 연한 색이 묻히지 않도록 두께만 2px로 올렸다.
- **2026-09-07 v0.3.1** — `globals.css`와 컴포넌트에 토큰 적용. 이월 수정 항목 14건 처리. 스크롤바 규칙 추가. `IconButton`·`CodeCopy` 정리.
- **2026-09-07 v0.3** — 14건 재추출 후 반영. 텍스트 색을 **Expo 실측에 맞춤**(본문 16.07 ≈ Expo 16.39, 보조 6.04 ≈ Expo 5.94)하고 그 근거로 Sprinters와의 색온도 비교를 기록. 3차만 Expo가 AA 미달이라 4.83으로 상향. `gray-600`·`700`을 `#707070`·`#616161`로 조정하고 본문 텍스트를 `gray-950` → `gray-900`으로 완화. 글 상세 정렬을 왼쪽으로 확정(Sprinters의 가운데 정렬은 미채택). Expo 다크 실측(`#111113`/`#18191b`)으로 표면 분리를 검증. `--mobile` 무효·`--dark-mode` 부분 실패·모달 오염을 근거 파일 절에 기록.
- **2026-09-07 v0.2** — 4개 JSON을 전부 재검토. 다크 모드·스크롤바·카드 구조가 추출 자료에 없다는 사실을 명시하고 [관찰]/[결정]/[제안] 표기를 도입. 중립 램프를 11단계로 재설계해 다크 표면 붕괴를 해결하고 모든 대비를 계산해 기록. 텍스트 색을 4단계 → 3단계로 축소하고 `--fg`·`--muted` 별칭 제거. 도토리 primary의 브랜드 근거를 명시. 홈은 loke, 카드는 sprinters 기준으로 재작성. 재추출 계획과 v0.1 이월 수정 항목 추가.
- **2026-09-07 v0.1** — 4개 추출 결과와 현재 구현을 바탕으로 제안 작성.
