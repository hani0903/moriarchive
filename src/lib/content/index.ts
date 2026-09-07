/**
 * 콘텐츠 로더와 카테고리 인덱스를 모아 내보낸다.
 *
 * `posts`와 `files`가 `node:fs`를 import하므로 서버 전용이다.
 * 클라이언트 컴포넌트에서는 이 barrel을 import하지 않는다.
 */
export { categoryIndex, createCategoryIndex } from '@/lib/content/categories';
export {
    getCategoryPosts,
    getPost,
    getPostSummaries,
    getPublishedPosts,
    formatDate,
    loadPosts,
    toSummary,
    todayInSeoul,
    type PostDetail,
    type PostSummary,
} from '@/lib/content/posts';
export { getFeaturedProjects, getProjects } from '@/lib/content/projects';
export { categorySchema, dateSchema, slugSchema, type Category, type Project } from '@/lib/content/schemas';
