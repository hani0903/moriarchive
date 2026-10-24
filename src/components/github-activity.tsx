import type { ContributionCalendar } from '@/lib/github';

const monthLabel = new Intl.DateTimeFormat('ko-KR', { month: 'short', timeZone: 'UTC' });
const dayLabel = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', timeZone: 'UTC' });

/** 날짜 문자열(YYYY-MM-DD)을 UTC 자정으로 읽는다. 서버 시간대에 따라 요일이 밀리지 않게 하기 위해서다. */
const toDate = (value: string) => new Date(`${value}T00:00:00Z`);

/**
 * GitHub 잔디. 서버에서 그리며 클라이언트 JavaScript가 없다.
 * - 칸은 주(열) × 요일(행) 그리드이고 색은 도토리 램프 5단계다(`--heat-0`~`--heat-4`).
 * - 좁은 화면에서는 가로로 스크롤된다. 처음 위치는 최근 주(오른쪽 끝)이고 왼쪽으로 넘기면 지난 기록이 나온다.
 *   스크롤 상자는 키보드 초점을 받아 방향키로도 움직인다.
 * - 그래프는 `role="img"`이고 요약을 접근성 이름으로 준다. 칸별 수치는 마우스 툴팁(`title`)으로만 보인다 —
 *   371칸을 Tab으로 하나씩 지나가게 만들지 않기 위해서다.
 */
export function GitHubActivity({
    calendar,
    profileUrl,
}: {
    calendar: ContributionCalendar;
    profileUrl: string;
}) {
    const { weeks, total } = calendar;
    const firstWeekday = weeks[0]?.[0] ? toDate(weeks[0][0].date).getUTCDay() : 0;

    // 달이 바뀌는 주에 월 이름을 단다. 바로 앞 라벨과 3주 이내면 겹치므로 건너뛴다.
    const months: { column: number; label: string }[] = [];
    weeks.forEach((week, i) => {
        const date = toDate(week[0].date);
        const previous = i > 0 ? toDate(weeks[i - 1][0].date) : null;
        if (previous && previous.getUTCMonth() === date.getUTCMonth()) return;
        if (months.length && i - months[months.length - 1].column < 3) return;
        months.push({ column: i, label: monthLabel.format(date) });
    });

    return (
        <section className="bento-card bento-github" aria-labelledby="bento-github">
            <div className="github-head">
                <h2 className="bento-label" id="bento-github">
                    GitHub 활동
                </h2>
                <a className="text-link bento-label" href={profileUrl}>
                    프로필 보기
                </a>
            </div>
            <p className="github-total">
                지난 1년 <strong>{total.toLocaleString('ko-KR')}</strong>회 기여
            </p>
            <div
                className="github-graph"
                tabIndex={0}
                role="region"
                aria-label="GitHub 기여 그래프"
                style={{ '--weeks': weeks.length } as React.CSSProperties}
            >
                <div
                    className="github-graph-inner"
                    role="img"
                    aria-label={`지난 1년 GitHub 기여 ${total.toLocaleString('ko-KR')}회`}
                >
                    <div className="github-months" aria-hidden="true">
                        {months.map((m) => (
                            <span key={m.column} style={{ gridColumnStart: m.column + 1 }}>
                                {m.label}
                            </span>
                        ))}
                    </div>
                    <div className="github-days" aria-hidden="true">
                        {Array.from({ length: firstWeekday }, (_, i) => (
                            <span key={`pad-${i}`} className="github-day-pad" />
                        ))}
                        {weeks.flat().map((d) => (
                            <span
                                key={d.date}
                                className="github-day"
                                data-level={d.level}
                                title={`${dayLabel.format(toDate(d.date))} · ${d.count}회`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <p className="github-legend" aria-hidden="true">
                적음
                {[0, 1, 2, 3, 4].map((level) => (
                    <span key={level} className="github-day" data-level={level} />
                ))}
                많음
            </p>
        </section>
    );
}
