import Link from 'next/link';
export default function NotFound() {
    return (
        <div className="status-page">
            <div className="not-found-art" aria-hidden="true" />
            <h1 className="page-title">페이지를 찾을 수 없습니다</h1>
            <p className="page-intro text-secondary">주소가 잘못되었거나 아직 공개되지 않은 글입니다.</p>
            <Link className="text-link" href="/blog">
                전체 글 보기
            </Link>
        </div>
    );
}
