/**
 * schema.org 구조화 데이터. 검색엔진이 사이트·작성자·글을 이해하도록 돕는다.
 * - Next.js 권장대로 `<script type="application/ld+json">`으로 렌더링한다.
 * - `JSON.stringify`는 `</script>` 같은 문자열을 막지 않으므로 `<`를 `<`로 바꿔 넣는다.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
