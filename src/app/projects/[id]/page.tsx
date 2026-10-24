import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/content';
import { Toc } from '@/components/blog';
import { Breadcrumb } from '@/components/common';
import { ProjectScreens } from '@/components/projects';
import { renderMdx } from '@/lib/mdx/render';
import { pageMetadata } from '@/lib/seo/metadata';

type ProjectPageProps = { params: Promise<{ id: string }> };

/** 목록에 없는 id는 404로 보낸다. */
export const dynamicParams = false;

export async function generateStaticParams() {
    return (await getProjects()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = await getProject((await params).id);
    if (!project) notFound();
    return pageMetadata(project.title, project.summary, `/projects/${project.id}`);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProject((await params).id);
    if (!project) notFound();

    const { content, headings } = await renderMdx(project.content);

    return (
        <article className="article">
            <Breadcrumb items={[{ name: '프로젝트', href: '/projects' }, { name: project.title }]} />
            <h1 className="page-title project-title">
                {project.title}
                <span className="project-title-kind">{project.kind}</span>
            </h1>
            <p className="page-intro">{project.summary}</p>
            <p className="meta">
                {project.period} · {project.role}
            </p>
            <ul className="tags" aria-label="기술 스택">
                {project.technologies.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
            {project.links.length > 0 && (
                <ul className="plain-list project-card-links">
                    {project.links.map((link) => (
                        <li key={link.href}>
                            <a className="project-card-button" href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            <ProjectScreens project={project} />
            {headings.length > 0 && (
                <div className="toc-rail">
                    <Toc headings={headings} />
                </div>
            )}
            <div className="prose prose-mori max-w-none">{content}</div>
            <nav className="post-bottom" aria-label="다른 프로젝트 탐색">
                <Link className="arrow-link" href="/projects">
                    전체 프로젝트 보기
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </nav>
        </article>
    );
}
