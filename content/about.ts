// /about 페이지 내용. 원본은 Figma 「이력서-작성」 p-1이며 정리본은 .local-docs/portfolio-content.md(로컬 전용)에 있다.
// 프로젝트(p-2 ~ p-12)는 content/projects/*.mdx에 있다.
// 문구와 숫자를 새로 만들지 않는다. 바꿔야 하면 그 정리본의 근거부터 확인한다.
// `**굵게**`만 강조로 해석한다.

export const about = {
    name: '조하은',
    role: '프론트엔드 개발자',
    headline: '출시를 막던 문제를 끝까지 좁혀 해결하는 개발자입니다.',
    intro: [
        '모여에서는 앱 심사를 막던 로그인 장애를 좁혀 iOS · Android 출시(가입 **72**명)까지 마쳤고, 그래빗에서는 번들을 분석해 첫 로딩 JS를 **27%** 줄였습니다.',
        '최근에는 AI를 단순한 코드 생성 도구로 사용하기보다, 프로젝트 규칙과 작업 절차를 개발 과정에 연결하고 검증 가능한 결과를 만드는데 활용하고자 노력하고 있습니다.',
    ],
    githubLogin: 'hani0903',
    photo: { src: '/images/about/profile.webp', alt: '조하은 프로필 사진' },
    contacts: [
        { label: '이메일', value: 'whgkdms0000@gmail.com', href: 'mailto:whgkdms0000@gmail.com' },
        { label: 'GitHub', value: 'github.com/hani0903', href: 'https://github.com/hani0903' },
    ],
    skills: [
        { group: 'Core', items: ['React', 'Next.js', 'TypeScript'] },
        { group: 'State & Data', items: ['Zustand', 'TanStack Query'] },
        { group: 'UI', items: ['Tailwind CSS', 'Storybook', 'shadcn/ui'] },
        { group: 'Mobile', items: ['React Native', 'Expo', 'WebView'] },
        { group: 'Testing & API', items: ['Vitest', 'React Testing Library', 'Orval', 'OpenAPI Generator'] },
        { group: 'Build & Workflow', items: ['pnpm', 'Turborepo', 'Vite', 'Git', 'Figma'] },
    ],
    /** 최근 순. */
    history: [
        { group: '활동', title: 'IT 연합 동아리 CMC 19기 Web 파트', period: '2026.05 — 2026.08' },
        {
            group: '교육',
            title: '피그마(Figma)와 AI로 쉽게 배우는 UI 디자인 KDC 수료',
            period: '2026.04 — 2026.05',
        },
        { group: '자격', title: '정보처리기사', period: '2025.06.13 취득' },
        {
            group: '학력',
            title: '인천대학교 임베디드 시스템공학과',
            detail: '학점 3.77 / 4.5',
            period: '2021.01 — 2025.08',
        },
    ] as { group: string; title: string; detail?: string; period: string }[],
};
