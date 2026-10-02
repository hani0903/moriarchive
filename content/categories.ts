export const categories = [
    { id: 'development-design', name: '개발 설계', slug: 'design', parentId: 'development', order: 1 },
    { id: 'development', name: '개발', slug: 'development', order: 0 },
    {
        id: 'development-app',
        name: '앱 개발',
        slug: 'app-development',
        parentId: 'development',
        order: 0,
    },
    // 관련 글을 작성할 때 활성화할 하위 카테고리 후보.
    // { id: 'development-ui', name: 'UI · Design System', slug: 'ui-design-system', parentId: 'development', order: 1 },
    // { id: 'development-state', name: '데이터 · 상태 관리', slug: 'data-state', parentId: 'development', order: 2 },
    // { id: 'development-tooling', name: '개발 환경', slug: 'tooling', parentId: 'development', order: 3 },
    {
        id: 'development-react',
        name: 'JavaScript · React',
        slug: 'javascript-react',
        parentId: 'development',
        order: 4,
    },
    { id: 'algorithm', name: '알고리즘', slug: 'algorithm', order: 1 },
    { id: 'algorithm-dp', name: 'DP', slug: 'dp', parentId: 'algorithm', order: 0 },
];
