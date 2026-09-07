import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { slugSchema, dateSchema } from '@/lib/content/schemas';
import { categoryIndex } from '@/lib/content/categories';
import { todayInSeoul } from '@/lib/content/posts';

export async function createPost(options: {
    slug: string;
    title?: string;
    date?: string;
    categoryId?: string;
    directory?: string;
}) {
    const slug = slugSchema.parse(options.slug);
    const date = dateSchema.parse(options.date ?? todayInSeoul());
    const categoryId = options.categoryId ?? 'algorithm-dp';
    if (!categoryIndex.byId.has(categoryId)) throw new Error(`없는 카테고리: ${categoryId}`);
    const directory = options.directory ?? path.join(process.cwd(), 'content/posts');
    await mkdir(directory, { recursive: true });
    const filename = path.join(directory, `${slug}.mdx`);
    const source = `---\ntitle: ${JSON.stringify(options.title ?? slug)}\nslug: ${JSON.stringify(slug)}\ndate: ${JSON.stringify(date)}\nsummary: "글의 요약을 작성하세요."\ncategoryId: ${JSON.stringify(categoryId)}\ntags: []\ndraft: true\n---\n\n## 시작하기\n\n본문을 작성하세요.\n`;
    await writeFile(filename, source, { flag: 'wx', encoding: 'utf8' });
    return filename;
}
async function main() {
    const [slug, ...args] = process.argv.slice(2);
    if (!slug)
        throw new Error(
            '사용법: pnpm post:new 글-slug --title "제목" --date 2024-01-01 --category algorithm-dp',
        );
    const flags = new Map<string, string>();
    for (let i = 0; i < args.length; i += 2) {
        if (!['--title', '--date', '--category'].includes(args[i]) || args[i + 1] === undefined)
            throw new Error(`잘못된 옵션: ${args[i]}`);
        flags.set(args[i], args[i + 1]);
    }
    console.log(
        await createPost({
            slug,
            title: flags.get('--title'),
            date: flags.get('--date'),
            categoryId: flags.get('--category'),
        }),
    );
    console.log('비공개 초안을 만들었습니다. 공개 날짜와 내용을 확인한 뒤 draft: false로 바꾸세요.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    main().catch((error: Error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
