'use client';

import {useEffect, useRef, useState} from 'react';

export default function Mermaid({chart}: {chart: string}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#0E1013', // --ink
          primaryColor: '#CBA45C', // --gold
          primaryTextColor: '#F5F2EA', // --text
          primaryBorderColor: '#2C313A', // --border
          lineColor: '#6C727C', // --text-muted
          secondaryColor: '#1B1E23', // --bg-raised
          tertiaryColor: '#22262C', // --bg-elevated
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
        },
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const {svg: renderedSvg} = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (!svg) {
    return (
      <div className="my-8 p-6 border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] animate-pulse">
        <div className="h-32 rounded bg-[var(--color-line)] opacity-30" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 p-6 border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
}
