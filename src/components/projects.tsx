import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/content/schemas';
import { EmptyState } from '@/components/common/empty-state';

const MAX_CARD_TECHNOLOGIES = 5;

/**
 * 프로젝트 요약 카드. loke.dev의 프로젝트 카드 구조(썸네일 → 제목 → 설명 → 태그 → 링크)를 따른다.
 * - 제목 링크가 `::after`로 카드 전체를 덮어 어디를 눌러도 상세로 간다. 외부 링크 버튼은 그 위에 올라와 따로 눌린다.
 *   링크 안에 링크를 넣지 않기 위해서다.
 * - 소개 bento와 프로젝트 목록이 같은 카드를 쓴다. 배치는 `className`으로 바꾼다.
 */
export function ProjectCard({ project, className = '' }: { project: Project; className?: string }) {
    const technologies = project.technologies.slice(0, MAX_CARD_TECHNOLOGIES);
    const hiddenCount = project.technologies.length - technologies.length;

    return (
        <article className={`bento-card project-card ${className}`}>
            {project.screens.length > 0 && (
                <div className="project-card-thumb" aria-hidden="true">
                    {project.screens.slice(0, 3).map((s) => (
                        <Image key={s.src} src={s.src} alt="" width={390} height={844} sizes="140px" />
                    ))}
                </div>
            )}
            <div className="project-card-body">
                <h3 className="project-card-head">
                    {project.icon && (
                        <Image
                            className="project-card-icon"
                            src={project.icon.src}
                            alt=""
                            width={32}
                            height={32}
                        />
                    )}
                    <Link className="project-card-link" href={`/projects/${project.id}`}>
                        {project.title}
                    </Link>
                    <span className="bento-label">{project.kind}</span>
                </h3>
                <p className="project-card-summary">{project.summary}</p>
                <p className="project-card-figure">
                    <strong>{project.highlight.value}</strong> {project.highlight.label}
                </p>
                <ul className="plain-list about-skill-list" aria-label="기술 스택">
                    {technologies.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                    {hiddenCount > 0 && <li>+{hiddenCount}</li>}
                </ul>
                {project.links.length > 0 && (
                    <ul className="plain-list project-card-links">
                        {project.links.map((l) => (
                            <li key={l.href}>
                                <a className="project-card-button" href={l.href}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
    if (!projects.length)
        return (
            <EmptyState
                title="소개할 프로젝트를 준비하고 있습니다"
                actions={[{ href: '/blog', label: '블로그 글 보기' }]}
            />
        );
    return (
        <div className="project-grid">
            {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
            ))}
        </div>
    );
}

/** 상세 페이지의 서비스 화면 4장. */
export function ProjectScreens({ project }: { project: Project }) {
    if (!project.screens.length) return null;
    return (
        <ul className="plain-list project-screens" aria-label="서비스 화면">
            {project.screens.map((s) => (
                <li key={s.src}>
                    <figure>
                        <Image
                            src={s.src}
                            alt={s.alt}
                            width={390}
                            height={844}
                            sizes="(max-width: 639px) 45vw, 200px"
                        />
                        <figcaption>
                            <strong>{s.caption}</strong>
                            <span>{s.description}</span>
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    );
}
