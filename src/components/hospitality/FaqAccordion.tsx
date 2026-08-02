'use client';

import { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col border-t border-[var(--color-line)] max-w-[850px] mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-btn-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id} className="border-b border-[var(--color-line)] py-6">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center text-left gap-4 group focus:outline-none focus:text-[var(--color-gold)]"
              >
                <span className="font-semibold text-[clamp(1.2rem,2.2vw,1.6rem)] tracking-[-0.015em] text-[var(--color-white)] transition-colors duration-300 group-hover:text-[var(--color-gold)]">
                  {item.question}
                </span>
                <span className="mono text-[1.2rem] text-[var(--color-gold)] shrink-0 transition-transform duration-300 transform" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>
            </h3>
            
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-all duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? '1rem' : '0rem',
              }}
            >
              <div className="overflow-hidden">
                <p className="text-[var(--color-muted)] text-[1.1rem] leading-[1.65]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
