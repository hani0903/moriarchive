import { ProjectGrid } from '@/components/projects';
import { getProjects } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata('프로젝트', '프로젝트에서 해결한 문제와 그 과정', '/projects');
export default async function Projects() {
    return (
        <>
            <h1 className="page-title">프로젝트</h1>
            <p className="page-intro">프로젝트마다 해결한 문제를 원인과 판단, 결과 순서로 정리했습니다.</p>
            <ProjectGrid projects={await getProjects()} />
        </>
    );
}
