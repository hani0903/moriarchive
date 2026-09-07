/**
 * Removes build and dependency caches.
 *
 * Plain .mjs with only node: builtins so it never imports from node_modules —
 * otherwise it could not delete the directory it was running out of.
 *
 * Windows holds locks on files a dev server or editor still has open, so each
 * removal retries before giving up. Stop `next dev` first if a path refuses.
 *
 *   node scripts/clean.mjs         .next and tool caches
 *   node scripts/clean.mjs --all   the above plus node_modules
 */
import { rm, stat } from 'node:fs/promises';

const all = process.argv.includes('--all');
const targets = ['.next', 'node_modules/.cache', ...(all ? ['node_modules'] : [])];

let failed = false;

for (const target of targets) {
    let existed = true;
    try {
        await stat(target);
    } catch {
        existed = false;
    }
    if (!existed) {
        console.log(`건너뜀  ${target} (없음)`);
        continue;
    }
    try {
        await rm(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
        console.log(`삭제됨  ${target}`);
    } catch (error) {
        failed = true;
        console.error(`실패    ${target}: ${error.message}`);
    }
}

if (failed) {
    console.error('\n일부를 지우지 못했습니다. 개발 서버나 편집기가 파일을 잡고 있는지 확인하세요.');
    process.exit(1);
}

// The lockfile is deliberately kept: deleting it turns a reinstall into an
// unpinned upgrade, which is a different operation from clearing a cache.
console.log(all ? '\n다음: pnpm install' : '\n다음: pnpm dev');
