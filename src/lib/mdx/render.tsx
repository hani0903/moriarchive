import { compileMDX } from 'next-mdx-remote/rsc'; // MDX 문자열을 받아 React 요소로 컴파일해주는 RSC용 API
import remarkGfm from 'remark-gfm'; // GitHub Flavored Markdown을 지원하는 remark 플러그인 - 표 / TODO / 취소선과 같은 추가 문법을 제공한다.
// CommonMark는 닫는 `**` 앞이 문장부호이고 뒤가 글자면 강조로 보지 않는다. `**렌더링(Rendering)**은`처럼
// 조사가 바로 붙는 한국어에서 `**`가 그대로 남는 원인이다. 이 두 플러그인이 CJK 문자 주변에서 그 규칙을 완화한다.
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough';
import rehypeSlug from 'rehype-slug'; // 제목 요소에 URL용 id를 붙이는 플러그인
import rehypePrettyCode from 'rehype-pretty-code'; // 코드 블록에 Shiki 기반 구문 강조 적용 플러그인
import { visit } from 'unist-util-visit'; // Markdown이나 HTML AST를 순회하는 함수
import { toString } from 'hast-util-to-string'; // AST 노드 안의 텍스트를 추출하는 함수
import type { Root } from 'hast'; // rehype가 다루는 HTML AST의 최상위 노드 타입
import { MermaidDiagram } from '@/components/blog/mermaid-diagram';
import { rehypeMermaid } from '@/lib/mdx/rehype-mermaid';
import { CopyCodeButton } from '@/components/blog/copy-code-button';

export type HeadingDepth = 2 | 3;
export type Heading = { id: string; title: string; depth: HeadingDepth };

/**
 * mdast가 아닌 hast에서 사용되는 객체이므로, `h2`와 같은 html 용어를 사용한다.
 */
const TOC_HEADING_DEPTH: Record<string, HeadingDepth | undefined> = { h2: 2, h3: 3 };

const LANGUAGE_LABELS: Record<string, string | undefined> = {
    bash: 'Terminal',
    css: 'CSS',
    html: 'HTML',
    javascript: 'JavaScript',
    js: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    markdown: 'Markdown',
    md: 'Markdown',
    shell: 'Terminal',
    ts: 'TypeScript',
    tsx: 'TSX',
    text: 'Text',
    yaml: 'YAML',
    yml: 'YAML',
};

/**
 * Markdown/MDX 문자열을 React 요소로 변환해주는 함수
 * - `Markdown/MDX 문자열 ⭢ remark 플러그인 ⭢ HTML AST(HAST)⭢ rehype 플러그인 ⭢ React 요소` 파이프라인을 거친다.
 * @param source 컴파일할 Markdown/MDX 본문 문자열
 * @returns 렌더링된 React 요소와 목차용 제목 목록
 */
export async function renderMdx(source: string) {
    const headings: Heading[] = []; // h2, h3 저장 배열

    /**
     * 트리를 읽으며 목차 데이터를 수집한다.
     * - rehypeSlug가 붙인 제목 ID도 읽어 목차 데이터로 수집한다.
     */
    function collectHeadings() {
        return (tree: Root) => {
            visit(tree, 'element', function collectTocHeading(node) {
                const depth = TOC_HEADING_DEPTH[node.tagName];
                if (depth === undefined) return;

                const id = node.properties?.id;
                if (typeof id !== 'string') return;

                headings.push({ id, title: toString(node), depth });
            });
        };
    }

    // MDX 문자열을 React 요소로 변환
    const result = await compileMDX({
        source, // 컴파일할 MDX 문자열
        components: {
            // 프로젝트 사례의 회색 요약 상자. Figma 포트폴리오의 사례 구조(제목 → 요약 → 문제 → …)를 따른다.
            Summary: ({ children }: { children: React.ReactNode }) => (
                <div className="case-summary">{children}</div>
            ),
            // MDX가 생성하는 HTML 태그를 대체할 React 컴포넌트
            // 표는 가로 스크롤 상자로 감싼다. 넘치는 폭은 상자가 받고 페이지는 밀리지 않는다.
            // 스크롤되는 영역은 키보드로도 움직일 수 있어야 하므로 초점을 받게 한다.
            table: (props) => (
                <div className="table-scroll" tabIndex={0} role="region" aria-label="표">
                    <table {...props} />
                </div>
            ),
            pre: ({ children, ...props }) => {
                const source = (props as Record<string, unknown>)['data-mermaid-source'];
                if (typeof source === 'string') return <MermaidDiagram source={source} />;
                const language = typeof props['data-language'] === 'string' ? props['data-language'] : 'text';
                const languageLabel = LANGUAGE_LABELS[language] ?? language.toUpperCase();

                return (
                    <div className="not-prose code-block" data-language={language}>
                        <div className="code-toolbar">
                            <span className="code-language">{languageLabel}</span>
                            <CopyCodeButton />
                        </div>
                        <pre {...props}>{children}</pre>
                    </div>
                );
            },
        },
        options: {
            // Content is authored locally. No remote or user-submitted MDX is executed.
            mdxOptions: {
                // Markdown 분석 단계에 사용할 플러그인으로 마크다운을 파싱해 mdast를 생성할 때 사용된다.
                // 취소선(`~~`)도 GFM 확장이라 CJK 보정을 따로 붙인다.
                remarkPlugins: [remarkGfm, remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough],
                rehypePlugins: [
                    // mdast를 hast로 변환한 뒤에 사용된다.
                    // collectHeadings는 rehypeSlug가 만든 제목 ID를 사용하므로 이 순서를 유지한다.
                    rehypeSlug,
                    collectHeadings,
                    rehypeMermaid,
                    [
                        rehypePrettyCode, // 플러그인
                        { theme: { light: 'github-light', dark: 'github-dark' } }, // 플러그인 설정 객체
                    ],
                ],
            },
        },
    });
    return { content: result.content, headings };
}
