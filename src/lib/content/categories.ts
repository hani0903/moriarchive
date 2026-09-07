import { z } from 'zod';
import { categorySchema, type Category } from '@/lib/content/schemas';
import { categories as definitions } from '@content/categories';

/**
 * 카테고리들이 올바른 트리 구조를 이루는지 검사하는 유틸
 *
 * @param input 검사할 카테고리 목록
 * @returns
 */
export function createCategoryIndex(input: unknown) {
    const categories = z.array(categorySchema).parse(input); // 배열 여부와 각 카테고리의 유효성을 검사

    /** ID 중복 검사를 진행하고 조회표 생성 */
    const byId = new Map<string, Category>();
    for (const c of categories) {
        if (byId.has(c.id)) throw new Error(`중복 카테고리 ID: ${c.id}`);
        byId.set(c.id, c);
    }

    /** 카테고리에 parentId가 있는 경우, 최상위 카테고리(`parentId` === undefined)가 나올 때까지 이동하며 계층 구조를 파악하는 유틸 */
    function ancestors(id: string): Category[] {
        const result: Category[] = [];
        const seen = new Set<string>();

        // 현재 조회할 카테고리 ID가 있는 동안 자신부터 부모 방향으로 순회
        let current: string | undefined = id;
        while (current) {
            if (seen.has(current)) throw new Error(`카테고리 순환: ${id}`); // a -> b / b -> a 로의 카테고리 순환 참조를 방어한다.
            seen.add(current);

            const category = byId.get(current);
            if (!category) throw new Error(`없는 카테고리: ${current}`);

            result.unshift(category); // 현재 카테고리를 앞에 추가해 최상위 → 자신 순서로 구성
            current = category.parentId; // 부모 카테고리로 이동
        }

        if (result.length > 2) throw new Error(`카테고리는 2단계까지 가능합니다: ${id}`); // 현재는 2단계까지만 가능하므로 막아둔다.
        return result;
    }

    /**
     * 경로 중복을 검사하며 경로 생성
     */
    const byPath = new Map<string, Category>();
    for (const c of categories) {
        // 부모 slug와 자식 slug를 합쳐서 path 구성
        const path = ancestors(c.id)
            .map((item) => item.slug)
            .join('/');

        // 이미 존재하는 path의 경우 error throw
        if (byPath.has(path)) throw new Error(`중복 카테고리 경로: ${path}`);
        byPath.set(path, c);
    }

    // 에러 없이 return 문에 도달하면
    return {
        // order가 같으면 로케일에 의존하지 않는 ID 비교로 정렬한다.
        all: categories.sort((a, b) => a.order - b.order || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
        byId,
        byPath,
        ancestors,
        href: (id: string) =>
            `/blog/category/${ancestors(id)
                .map((c) => c.slug)
                .join('/')}`,
        includes: (parent: string, child: string) => ancestors(child).some((c) => c.id === parent),
    };
}
export const categoryIndex = createCategoryIndex(definitions); // 의존성 주입
