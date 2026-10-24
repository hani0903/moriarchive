/**
 * GitHub 기여 기록(잔디)을 GraphQL API로 읽는다. 서버 전용이다.
 * - `GITHUB_TOKEN`은 scope 없는 classic 토큰이면 충분하다. 공개 정보만 읽는다.
 *   fine-grained 토큰은 소유자 한 명에게 묶여 조직 저장소 기여가 빠진다(2,312회 → 240회로 확인).
 * - 토큰이 없거나 요청이 실패하면 `null`을 돌려준다. 호출부는 카드를 숨긴다 — 외부 API 때문에 페이지가 깨지지 않게 하기 위해서다.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
export type ContributionDay = { date: string; count: number; level: ContributionLevel };
export type ContributionCalendar = { total: number; weeks: ContributionDay[][] };

const LEVELS: Record<string, ContributionLevel> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
};

const QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

type Response = {
    data?: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: {
                        contributionDays: {
                            date: string;
                            contributionCount: number;
                            contributionLevel: string;
                        }[];
                    }[];
                };
            };
        } | null;
    };
};

export async function getContributionCalendar(login: string): Promise<ContributionCalendar | null> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: QUERY, variables: { login } }),
            // 하루에 한 번만 받는다. 잔디는 하루 단위로 바뀐다.
            next: { revalidate: 86400 },
        });
        if (!response.ok) return null;

        const calendar = ((await response.json()) as Response).data?.user?.contributionsCollection
            .contributionCalendar;
        if (!calendar) return null;

        return {
            total: calendar.totalContributions,
            weeks: calendar.weeks.map((w) =>
                w.contributionDays.map((d) => ({
                    date: d.date,
                    count: d.contributionCount,
                    level: LEVELS[d.contributionLevel] ?? 0,
                })),
            ),
        };
    } catch {
        return null;
    }
}
