import path from 'node:path';
import { cache } from 'react';
import { projectSchema, type Project } from '@/lib/content/schemas';
import { readMdxFiles } from '@/lib/content/files';

/**
 * `Project` frontmatter와 상세 페이지 본문 `content`를 모두 포함하는 타입
 */
export type ProjectDetail = Project & { content: string };

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

/**
 * 프로젝트 MDX를 읽고 검증한다.
 * - 카드에 보이는 사례 제목이 본문 `## 제목`과 어긋나면 빌드를 멈춘다. 목록과 상세가 다른 말을 하지 않게 하기 위해서다.
 * @param directory 읽을 mdx 파일들이 존재하는 위치
 */
export async function loadProjects(directory = PROJECTS_DIRECTORY): Promise<ProjectDetail[]> {
    const files = await readMdxFiles(directory);
    const seen = new Set<string>();

    return files
        .map(function validateProject({ filename, data, content }) {
            const parsed = projectSchema.safeParse(data);
            if (!parsed.success)
                throw new Error(
                    `${filename}: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`,
                );

            const project = parsed.data;
            if (seen.has(project.id))
                throw new Error(`${filename}: 프로젝트 ID가 중복되었습니다. (${project.id})`);
            seen.add(project.id);

            const sectionTitles = new Set(content.match(/^## .+$/gm)?.map((line) => line.slice(3).trim()));
            const missing = project.cases.filter((c) => !sectionTitles.has(c.title));
            if (missing.length)
                throw new Error(
                    `${filename}: 본문에 없는 사례 제목: ${missing.map((c) => c.title).join(', ')}`,
                );

            return { ...project, content };
        })
        .sort(
            (a, b) =>
                (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity) || a.id.localeCompare(b.id),
        );
}

/** 서버에서만 쓰이므로 본문을 떼어 내지 않는다. 카드는 frontmatter만 읽는다. */
export const getProjects = cache(async (): Promise<Project[]> => loadProjects());

export async function getProject(id: string) {
    return (await loadProjects()).find((p) => p.id === id);
}

export async function getFeaturedProjects() {
    return (await getProjects()).filter((p) => p.featuredOrder !== undefined).slice(0, 3);
}
