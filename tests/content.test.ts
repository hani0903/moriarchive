import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadPosts, toSummary, todayInSeoul, getPublishedPosts } from '@/lib/content/posts';
import { createCategoryIndex, categoryIndex } from '@/lib/content/categories';
import { createPost } from '../scripts/new-post';
import { postMetadata } from '@/lib/seo/metadata';
import sitemap from '@/app/sitemap';

const base = {
    title: '제목',
    slug: 'test-post',
    date: '2024-01-01',
    summary: '요약',
    categoryId: 'algorithm-dp',
    draft: false,
};
async function withPost(data: object, run: (dir: string) => Promise<void>, filename = 'test-post.mdx') {
    const dir = await mkdtemp(path.join(tmpdir(), 'mori-test-'));
    try {
        await writeFile(path.join(dir, filename), `---\n${JSON.stringify(data)}\n---\n## 본문\n내용`);
        await run(dir);
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
}
test('explicit old date is preserved; missing image uses fallback; summary does not contain body', async () => {
    await withPost(base, async (dir) => {
        const [post] = await loadPosts(dir, '2026-09-06');
        assert.equal(post.date, '2024-01-01');
        const summary = toSummary(post);
        assert.equal(summary.cover.src, '/images/default-thumbnail.png');
        assert.equal('content' in summary, false);
        assert.deepEqual(
            summary.categoryPath.map((c) => c.name),
            ['알고리즘', 'DP'],
        );
    });
});
test('date format, impossible date, missing date, future publication, update order, category and slug reject with filename', async () => {
    for (const change of [
        { date: '2024-02-30' },
        { date: undefined },
        { date: '01/01/2024' },
        { date: '2099-01-01' },
        { updated: '2023-12-31' },
        { categoryId: 'missing' },
        { slug: 'other' },
    ]) {
        await withPost({ ...base, ...change }, async (dir) => {
            await assert.rejects(loadPosts(dir, '2026-09-06'), /test-post.mdx/);
        });
    }
});
test('draft defaults to true; missing thumbnail fails rather than broken image', async () => {
    const { draft: _draft, ...data } = base;
    void _draft;
    await withPost(data, async (dir) => {
        assert.equal((await loadPosts(dir))[0].draft, true);
    });
    await withPost({ ...base, thumbnail: { src: '/images/missing.png', alt: '' } }, async (dir) => {
        await assert.rejects(loadPosts(dir), /썸네일/);
    });
});
test('duplicate slug rejected', async () => {
    await withPost(base, async (dir) => {
        await writeFile(path.join(dir, 'z-other.mdx'), `---\n${JSON.stringify(base)}\n---\ntext`);
        await assert.rejects(loadPosts(dir), /중복 slug/);
    });
});
test('category parent inclusion and invalid trees', () => {
    assert.equal(categoryIndex.includes('algorithm', 'algorithm-dp'), true);
    assert.equal(categoryIndex.includes('algorithm-dp', 'algorithm'), false);
    const root = { id: 'a', slug: 'a', name: '한글' };
    assert.throws(() => createCategoryIndex([root, root]), /중복/);
    assert.throws(() => createCategoryIndex([{ ...root, parentId: 'missing' }]), /없는/);
    assert.throws(() => createCategoryIndex([{ ...root, parentId: 'a' }]), /순환/);
    assert.throws(
        () =>
            createCategoryIndex([
                root,
                { id: 'b', slug: 'b', name: 'B', parentId: 'a' },
                { id: 'c', slug: 'c', name: 'C', parentId: 'b' },
            ]),
        /2단계/,
    );
    assert.throws(() => createCategoryIndex([root, { ...root, id: 'other' }]), /경로/);
});
test('new post uses persistent explicit date, quotes text, does not overwrite', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'mori-create-'));
    try {
        const file = await createPost({
            slug: 'new-post',
            title: '제목: "따옴표"',
            date: '2023-05-20',
            directory: dir,
        });
        const [post] = await loadPosts(dir);
        assert.equal(post.date, '2023-05-20');
        assert.equal(post.title, '제목: "따옴표"');
        assert.equal(post.draft, true);
        const before = await readFile(file, 'utf8');
        await assert.rejects(createPost({ slug: 'new-post', directory: dir }), /EEXIST/);
        assert.equal(await readFile(file, 'utf8'), before);
        await createPost({ slug: 'today-post', directory: dir });
        assert.equal((await loadPosts(dir)).find((p) => p.slug === 'today-post')?.date, todayInSeoul());
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
});
test('Seoul date handles UTC date boundary', () => {
    assert.equal(todayInSeoul(new Date('2024-01-01T16:00:00Z')), '2024-01-02');
});
test('public loader and sitemap exclude drafts; metadata uses original date and own canonical', async () => {
    const before = process.env.CONTENT_DIRECTORY;
    process.env.CONTENT_DIRECTORY = path.join(process.cwd(), 'tests/fixtures/posts');
    try {
        const posts = await getPublishedPosts();
        assert.deepEqual(
            posts.map((p) => p.slug),
            ['example-dp'],
        );
        const entries = await sitemap();
        assert.ok(entries.some((e) => e.url.endsWith('/blog/example-dp')));
        assert.ok(entries.some((e) => e.url.endsWith('/blog/category/algorithm')));
        assert.ok(!JSON.stringify(entries).includes('private-example'));
        assert.equal(
            entries.find((e) => e.url.endsWith('/blog/example-dp'))?.lastModified,
            '2024-04-01T00:00:00+09:00',
        );
        const meta = postMetadata(posts[0]);
        assert.equal(meta.title, 'DP 개념 — 기능 확인용 예제');
        assert.ok(String(meta.alternates?.canonical).endsWith('/blog/example-dp'));
    } finally {
        if (before === undefined) delete process.env.CONTENT_DIRECTORY;
        else process.env.CONTENT_DIRECTORY = before;
    }
});
