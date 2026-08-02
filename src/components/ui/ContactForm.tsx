'use client';

import {useState, useRef, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';

export default function ContactForm({ source = 'general' }: { source?: string }) {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [cooldown, setCooldown] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const loadTimeRef = useRef<number>(Date.now());

  // Record page load time for timing-based bot detection
  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side cooldown: prevent rapid re-submission
    if (cooldown || status === 'loading') return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Honeypot check: if the hidden field has a value, silently reject (bot)
    if (data.website) {
      setStatus('success'); // Fake success so bot thinks it worked
      return;
    }

    // Timing check: reject submissions faster than 2 seconds after page load
    const elapsed = Date.now() - loadTimeRef.current;
    if (elapsed < 2000) {
      setStatus('success'); // Fake success for bots
      return;
    }

    setStatus('loading');
    setCooldown(true);

    // Add timestamp for server-side verification
    const payload = {
      name: data.name,
      email: data.email,
      message: data.message,
      source: data.source,
      _t: loadTimeRef.current.toString(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setStatus('success');
        formRef.current?.reset();
      } else if (res.status === 429) {
        setStatus('error');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    // 10-second cooldown between submissions
    setTimeout(() => setCooldown(false), 10_000);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 w-full max-w-lg">
      <input type="hidden" name="source" value={source} />

      {/* Honeypot: invisible to humans, bots auto-fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden', tabIndex: -1 } as React.CSSProperties}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="mono !text-[0.82rem]">{t('form_name')}</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          minLength={2}
          maxLength={200}
          className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[5px] p-4 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="mono !text-[0.82rem]">{t('form_email')}</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          maxLength={320}
          className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[5px] p-4 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="mono !text-[0.82rem]">{t('form_message')}</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[5px] p-4 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
        ></textarea>
      </div>
      
      <div className="mt-2">
        <Button
          type="submit"
          className={status === 'loading' || cooldown ? 'opacity-70 pointer-events-none' : ''}
        >
          {status === 'loading' ? t('form_sending') : t('form_submit')}
          {status !== 'loading' && (
            <svg className="w-[1.2em] h-[1.2em] inline-block fill-none stroke-current stroke-[2.6] stroke-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </Button>
      </div>

      {status === 'success' && (
        <p className="text-green-400 text-sm mt-2">{t('form_success')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">{t('form_error')}</p>
      )}
    </form>
  );
}
