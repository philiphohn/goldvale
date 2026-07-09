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
        theme: 'base',
        themeVariables: {
          darkMode: true,
          background: '#0E1013', // --ink
          textColor: '#F5F2EA', // --text
          lineColor: '#6C727C', // --text-muted
          primaryColor: '#CBA45C', // --gold
          primaryTextColor: '#0E1013', // dark text on gold background
          primaryBorderColor: '#2C313A', // --border
          secondaryColor: '#1B1E23', // --bg-raised
          tertiaryColor: '#22262C', // --bg-elevated
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
          // Timeline scale colors (from Goldvale infographic palette)
          cScale0: '#CBA45C',
          cScaleLabel0: '#0E1013',
          cScale1: '#FF3E7F',
          cScaleLabel1: '#F5F2EA',
          cScale2: '#2FB6A8',
          cScaleLabel2: '#0E1013',
          cScale3: '#4C8DF0',
          cScaleLabel3: '#F5F2EA',
          cScale4: '#9B6CF0',
          cScaleLabel4: '#F5F2EA',
          cScale5: '#5CC98A',
          cScaleLabel5: '#0E1013',
          cScale6: '#F0894C',
          cScaleLabel6: '#F5F2EA',
          cScale7: '#46C6E0',
          cScaleLabel7: '#0E1013',
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
