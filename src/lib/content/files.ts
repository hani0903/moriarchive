import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

type MdxFile = {
    filename: string;
    data: Record<string, unknown>;
    content: string;
};

async function readMdxFile(directory: string, filename: string): Promise<MdxFile> {
    try {
        const source = await readFile(path.join(directory, filename), 'utf8');
        const { data, content } = matter(source);

        return { filename, data, content };
    } catch (error) {
        // 실패한 파일 이름을 추가하고 원본 오류를 보존한다.
        throw new Error(`${filename}: MDX 파일 읽기 또는 파싱 실패`, { cause: error });
    }
}

/**
 * MDX 파일을 읽어 frontmatter와 본문으로 분리한다.
 * - frontmatter가 글 스키마에 맞는지는 호출부에서 검증한다.
 */
export async function readMdxFiles(directory: string): Promise<MdxFile[]> {
    // 디렉토리 항목의 반환 순서에 의존하지 않도록 파일 이름으로 정렬한다.
    const filenames = (await readdir(directory)).filter((name) => name.endsWith('.mdx')).sort();

    // 각 파일을 비동기로 읽되, 결과는 filenames 순서로 반환한다.
    return Promise.all(filenames.map((filename) => readMdxFile(directory, filename)));
}
