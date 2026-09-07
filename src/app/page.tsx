import { profile } from '@content/site';
import { getFeaturedProjects, getPostSummaries } from '@/lib/content';
import { PostList } from '@/components/blog';
import { SectionHeader } from '@/components/common';
import { ProjectList } from '@/components/projects';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata('홈', profile.description, '/');

export default async function Home() {
    const posts = await getPostSummaries();
    return (
        <>
            <h1 className="page-title">{profile.name}</h1>
            <p className="page-intro">{profile.introduction}</p>
            <section className="content-section" aria-labelledby="projects-title">
                <SectionHeader
                    id="projects-title"
                    title="대표 프로젝트"
                    href="/projects"
                    linkLabel="모든 프로젝트 보기"
                />
                <ProjectList projects={getFeaturedProjects()} compact />
            </section>
            <section className="content-section" aria-labelledby="posts-title">
                <SectionHeader id="posts-title" title="최근 글" href="/blog" linkLabel="전체 글 보기" />
                <PostList posts={posts.slice(0, 3)} />
            </section>
        </>
    );
}
