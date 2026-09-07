import { projects } from '@content/projects';
import { projectSchema } from '@/lib/content/schemas';

export function getProjects() {
    const result = projects.map((p) => projectSchema.parse(p));

    if (new Set(result.map((p) => p.id)).size !== result.length)
        throw new Error('프로젝트 ID가 중복되었습니다.');

    return result;
}

export function getFeaturedProjects() {
    return getProjects()
        .filter((p) => p.featuredOrder !== undefined)
        .sort((a, b) => a.featuredOrder! - b.featuredOrder! || a.id.localeCompare(b.id))
        .slice(0, 3);
}
