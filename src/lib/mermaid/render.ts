import type { MermaidConfig } from 'mermaid';

// initialize changes Mermaid's shared configuration. Keep initialization and
// rendering in the same queue so diagrams and rapid theme changes cannot race.
let pending: Promise<unknown> = Promise.resolve();

export function renderDiagram(id: string, source: string, config: MermaidConfig) {
    const next = pending.then(async () => {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize(config);
        return mermaid.render(id, source);
    });
    pending = next.catch(() => undefined);
    return next;
}

export function diagramConfig(element: HTMLElement, dark: boolean): MermaidConfig {
    const styles = getComputedStyle(element);
    const color = (role: string) => styles.getPropertyValue(role).trim();
    const panel = color('--panel');
    const text = color('--text-primary');
    const line = color('--line-strong');
    const font = styles.fontFamily;
    return {
        startOnLoad: false,
        securityLevel: 'strict',
        suppressErrorRendering: true,
        theme: 'base',
        fontFamily: font,
        flowchart: { htmlLabels: false, useMaxWidth: false, curve: 'linear' },
        sequence: {
            useMaxWidth: false,
            actorFontFamily: font,
            noteFontFamily: font,
            messageFontFamily: font,
        },
        themeVariables: {
            darkMode: dark,
            fontFamily: font,
            fontSize: '16px',
            background: panel,
            primaryColor: panel,
            primaryTextColor: text,
            primaryBorderColor: line,
            secondaryColor: panel,
            secondaryTextColor: text,
            secondaryBorderColor: line,
            tertiaryColor: panel,
            tertiaryTextColor: text,
            tertiaryBorderColor: line,
            lineColor: line,
            textColor: text,
            mainBkg: panel,
            nodeBorder: line,
            clusterBkg: panel,
            clusterBorder: line,
            edgeLabelBackground: panel,
            nodeTextColor: text,
            actorBkg: panel,
            actorBorder: line,
            actorTextColor: text,
            actorLineColor: line,
            signalColor: line,
            signalTextColor: text,
            labelBoxBkgColor: panel,
            labelBoxBorderColor: line,
            labelTextColor: text,
            loopTextColor: text,
            noteBkgColor: panel,
            noteBorderColor: line,
            noteTextColor: text,
            activationBkgColor: panel,
            activationBorderColor: line,
            sequenceNumberColor: text,
        },
    };
}
