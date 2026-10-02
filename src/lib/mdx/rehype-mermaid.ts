import type { Root } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

/** Preserve the source before Shiki handles ordinary code blocks. */
export function rehypeMermaid() {
    return (tree: Root) => {
        visit(tree, 'element', (node) => {
            if (node.tagName !== 'pre') return;
            const code = node.children[0];
            if (code?.type !== 'element' || code.tagName !== 'code') return;
            const classes = code.properties.className;
            if (!Array.isArray(classes) || !classes.includes('language-mermaid')) return;
            node.properties['data-mermaid-source'] = toString(code);
            node.children = [];
        });
    };
}
