import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { about } from '@content/about';
import { profile } from '@content/site';
import { getFeaturedProjects, getPostSummaries } from '@/lib/content';
import { ProjectCard } from '@/components/projects';
import { GitHubMark, SkillIcon } from '@/components/common';
import { GitHubActivity } from '@/components/github-activity';
import { getContributionCalendar } from '@/lib/github';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('소개', profile.description, '/about');

/** `**굵게**`만 <strong>으로 바꾼다. */
function Emphasis({ text }: { text: string }) {
    return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

export default async function About() {
    const [posts, projects, calendar] = await Promise.all([
        getPostSummaries(),
        getFeaturedProjects(),
        getContributionCalendar(about.githubLogin),
    ]);
    const [email, github] = about.contacts;

    return (
        <>
            <h1 className="sr-only">소개</h1>
            {/* 잔디를 못 받으면 그 행을 그리드에서 뺀다. 빈 행이 남지 않게 하기 위해서다. */}
            <div className={calendar ? 'bento bento-has-github' : 'bento'}>
                <section className="bento-card bento-intro" aria-label="자기소개">
                    <p className="bento-label">
                        {about.name} · {about.role}
                    </p>
                    <div>
                        <p className="bento-headline">{about.headline}</p>
                        {about.intro.map((p) => (
                            <p key={p} className="bento-intro-text">
                                <Emphasis text={p} />
                            </p>
                        ))}
                    </div>
                </section>

                <div className="bento-card bento-photo">
                    <Image
                        src={about.photo.src}
                        alt={about.photo.alt}
                        fill
                        quality={90}
                        sizes="(max-width: 899px) 50vw, 260px"
                        priority
                    />
                </div>

                {/* 상세는 /projects/[id]에 있다. 앞의 두 프로젝트가 bento의 두 칸을 차지한다. */}
                {projects.slice(0, 2).map((p, i) => (
                    <ProjectCard
                        key={p.id}
                        project={p}
                        className={i === 0 ? 'bento-project-a' : 'bento-project-b'}
                    />
                ))}
                {calendar && <GitHubActivity calendar={calendar} profileUrl={github.href} />}

                <section className="bento-card bento-skills" aria-labelledby="bento-skills">
                    <h2 className="bento-label" id="bento-skills">
                        기술
                    </h2>
                    <dl className="bento-skill-groups">
                        {about.skills.map((s) => (
                            <div key={s.group}>
                                <dt>{s.group}</dt>
                                <dd>
                                    <ul className="plain-list about-skill-list">
                                        {s.items.map((item) => (
                                            <li key={item}>
                                                <SkillIcon name={item} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="bento-card bento-history" aria-labelledby="bento-history">
                    <h2 className="bento-label" id="bento-history">
                        학력 · 자격 · 활동
                    </h2>
                    <ul className="plain-list bento-history-list">
                        {about.history.map((item) => (
                            <li key={item.title}>
                                <span className="bento-history-title">{item.title}</span>
                                <span className="bento-label">
                                    {item.period}
                                    {item.detail && ` · ${item.detail}`}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bento-card bento-contact" aria-labelledby="bento-contact">
                    <h2 className="bento-label" id="bento-contact">
                        연락
                    </h2>
                    <div className="bento-contact-links">
                        <a className="bento-contact-link" href={email.href}>
                            <Mail size={16} aria-hidden="true" />
                            {email.value}
                        </a>
                        <a className="bento-contact-link" href={github.href}>
                            <GitHubMark />
                            {github.value}
                        </a>
                    </div>
                </section>

                <Link className="bento-card bento-card-action bento-blog" href="/blog">
                    <span className="bento-arrow" aria-hidden="true">
                        <ArrowUpRight size={16} />
                    </span>
                    <span className="bento-label">블로그</span>
                    <span className="bento-figure">
                        <span className="bento-figure-value">{posts.length}편</span>
                        {posts[0] && <span className="bento-label">최근 글 · {posts[0].title}</span>}
                    </span>
                </Link>
            </div>
        </>
    );
}
