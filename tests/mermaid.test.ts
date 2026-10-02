import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Root, Element } from 'hast';
import { rehypeMermaid } from '@/lib/mdx/rehype-mermaid';

function block(language: string, source: string): Element {
    return {
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [
            {
                type: 'element',
                tagName: 'code',
                properties: { className: [`language-${language}`] },
                children: [{ type: 'text', value: source }],
            },
        ],
    };
}

test('Mermaid fences preserve source without leaving code for Shiki; ordinary code stays intact', () => {
    const source = 'sequenceDiagram\n    participant B as 브라우저\n    B->>B: 확인 <>&\n';
    const diagram = block('mermaid', source);
    const ordinary = block('ts', 'const value = 1;');
    const before = structuredClone(ordinary);
    const tree: Root = { type: 'root', children: [diagram, ordinary] };
    rehypeMermaid()(tree);
    assert.equal(diagram.properties['data-mermaid-source'], source);
    assert.deepEqual(diagram.children, []);
    assert.deepEqual(ordinary, before);
});

test('demo diagrams parse with the installed Mermaid and invalid syntax is rejected', async (t) => {
    const { readFile } = await import('node:fs/promises');
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM('');
    const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
    Object.defineProperty(globalThis, 'window', { value: dom.window, configurable: true });
    t.after(() => {
        dom.window.close();
        if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
        else Reflect.deleteProperty(globalThis, 'window');
    });
    const { default: mermaid } = await import('mermaid');
    const fixture = await readFile('tests/fixtures/posts/example-dp.mdx', 'utf8');
    const diagrams = [...fixture.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((match) => match[1]);
    assert.equal(diagrams.length, 3);
    assert.equal((await mermaid.parse(diagrams[0]))?.diagramType, 'flowchart-v2');
    assert.equal((await mermaid.parse(diagrams[1]))?.diagramType, 'sequence');
    await assert.rejects(mermaid.parse(diagrams[2]));
});
