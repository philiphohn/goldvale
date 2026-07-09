'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="mono !text-[0.82rem]">{t('form_name')}</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
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
          className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[5px] p-4 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
        ></textarea>
      </div>
      
      <div className="mt-2">
        <Button type="submit" className={status === 'loading' ? 'opacity-70 pointer-events-none' : ''}>
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
