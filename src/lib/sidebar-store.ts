/**
 * 사이드바 열림 상태를 React 바깥에 보관한다.
 * 모듈 상태는 클라이언트 내비게이션 동안 유지되고, sessionStorage를 통해
 * 새로고침 뒤에도 복원된다.
 *
 * 하나의 컴포넌트가 읽는 boolean 하나뿐이므로 별도의 store 라이브러리는
 * 필요하지 않다. 마운트 effect에서 상태를 설정하는 대신 모듈 store와
 * useSyncExternalStore를 사용하는 이유는 react-hooks/set-state-in-effect
 * 규칙을 피하면서 sessionStorage 값을 복원하기 위해서다.
 */
const KEY = 'mori.sidebar'; // sessionStorage key

/**
 * 이 너비 이하에서는 사이드바가 본문을 밀어내지 않고 위에 겹친다.
 * 따라서 링크를 따라 이동할 때 사이드바를 닫아야 한다. 이 값은
 * globals.css의 오버레이 breakpoint와 일치해야 한다.
 */
export const SIDEBAR_OVERLAY_QUERY = '(max-width: 769px)'; // 사이드바를 본문 위에 띄우는 기준

/**
 * 현재 화면이 서버 렌더링이 아니며 모바일 오버레이 크기인지 확인하는 함수
 */
export function isSidebarOverlay() {
    return typeof window !== 'undefined' && window.matchMedia(SIDEBAR_OVERLAY_QUERY).matches;
}

/**
 *
 */
let open = false; // 사이드바 열림 여부
let readStorage = false;
const listeners = new Set<() => void>();

/** 서버와 첫 클라이언트 렌더가 false로 일치해 hydration 불일치를 막는다. */
export function getSidebarServerSnapshot() {
    return false;
}

export function getSidebarSnapshot() {
    return open;
}

export function subscribeSidebar(listener: () => void) {
    // 첫 구독은 hydration 뒤에 일어나므로 이 시점에 저장된 값을 복원해도 안전하다.
    // React는 구독 직후 snapshot을 다시 읽고 값이 바뀌었으면 다시 렌더링한다.
    if (!readStorage) {
        readStorage = true;
        try {
            open = sessionStorage.getItem(KEY) === 'open';
        } catch {
            // private mode이거나 저장소가 차단된 경우 닫힌 상태를 유지한다.
        }
    }
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function setSidebarOpen(next: boolean) {
    if (open === next) return;
    open = next;
    try {
        sessionStorage.setItem(KEY, next ? 'open' : 'closed');
    } catch {
        // 저장에 실패해도 현재 페이지 안에서는 상태가 계속 동작하므로 무시한다.
    }
    for (const listener of listeners) listener();
}
