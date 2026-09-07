import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const child = spawn(
    process.execPath,
    [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1'],
    {
        stdio: 'inherit',
        env: {
            ...process.env,
            CONTENT_DIRECTORY: path.join(process.cwd(), 'tests/fixtures/posts'),
            SITE_URL: '',
        },
    },
);
child.on('error', (error) => {
    console.error(error.message);
    process.exitCode = 1;
});
child.on('exit', (code) => {
    process.exitCode = code ?? 0;
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
        if (!child.killed) child.kill(signal);
    });
}
