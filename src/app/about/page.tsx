import { profile } from '@content/site';
import { pageMetadata } from '@/lib/seo/metadata';
export const metadata = pageMetadata('소개', profile.description, '/about');
export default function About() {
    return (
        <>
            <h1 className="page-title">소개</h1>
            <p className="page-intro">{profile.about}</p>
            <ul className="plain-list">
                {profile.links.map((l) => (
                    <li key={l.href}>
                        <a className="text-link" href={l.href}>
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}
