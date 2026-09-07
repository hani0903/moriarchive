import { ProjectList } from '@/components/projects';
import { getProjects } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata('프로젝트', '프로젝트의 문제, 기여와 결과', '/projects');
export default function Projects() {
    return (
        <>
            <h1 className="page-title">프로젝트</h1>
            <ProjectList projects={getProjects()} />
        </>
    );
}
