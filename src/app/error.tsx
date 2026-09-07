'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <div className="status-page">
            <h1 className="page-title">페이지를 불러오지 못했습니다</h1>
            <button className="button" onClick={reset}>
                다시 시도
            </button>
        </div>
    );
}
