import Image from 'next/image';
import type { Project } from '@/lib/content/schemas';
export function ProjectList({ projects, compact = false }: { projects: Project[]; compact?: boolean }) {
    if (!projects.length) return <p className="empty">소개할 프로젝트를 준비하고 있습니다.</p>;
    return (
        <div>
            {projects.map((p) => (
                <article key={p.id} className="project">
                    {p.image && (
                        <Image
                            src={p.image.src}
                            alt={p.image.alt}
                            width={640}
                            height={360}
                            className="thumbnail"
                        />
                    )}
                    <h2 className="card-title">{p.title}</h2>
                    <p className="card-summary">{p.summary}</p>
                    <p className="project-meta">
                        {p.role}
                        {!compact && ` · ${p.period} · ${p.collaboration} 프로젝트`}
                    </p>
                    <ul className="tags">
                        {(compact ? p.technologies.slice(0, 4) : p.technologies).map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                    {!compact && (
                        <dl>
                            <dt>해결한 문제</dt>
                            <dd>{p.problem}</dd>
                            <dt>내 기여</dt>
                            <dd>{p.contribution}</dd>
                            <dt>결과</dt>
                            <dd>{p.outcome}</dd>
                        </dl>
                    )}
                    <ul className="links">
                        {p.links.map((link) => (
                            <li key={link.href}>
                                <a className="text-link" href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    );
}
