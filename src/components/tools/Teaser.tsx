'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Teaser() {
  const t = useTranslations('otaTool.teaser');

  const [units, setUnits] = useState(6);
  const [adr, setAdr] = useState(120);

  return (
    <div className="w-full bg-[#14161A] border border-[#262930] rounded-2xl p-6 sm:p-8 my-12 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        <div className="space-y-2 max-w-xl">
          <span className="text-xs uppercase font-mono tracking-wider text-[#FF3E7F]">
            Provisions-Check
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t('title')}
          </h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#1C1F26] p-4 rounded-xl border border-[#2E333D]">
          
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#9CA3AF]">{t('units_label')}</label>
            <input
              type="number"
              min={1}
              max={100}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="w-20 bg-[#14161A] border border-[#2E333D] rounded-lg px-2.5 py-1.5 text-sm font-mono text-white text-center focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#9CA3AF]">{t('adr_label')}</label>
            <input
              type="number"
              min={20}
              max={1000}
              value={adr}
              onChange={(e) => setAdr(Number(e.target.value))}
              className="w-28 bg-[#14161A] border border-[#2E333D] rounded-lg px-2.5 py-1.5 text-sm font-mono text-white text-center focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>

          <div className="sm:self-end pt-1 sm:pt-0">
            <Link
              href={`/tools/ota-provisionsrechner?units=${units}&adr=${adr}`}
              className="inline-flex items-center justify-center py-2.5 px-5 bg-[#FF3E7F] hover:bg-[#FF548F] text-white text-xs font-medium rounded-lg transition-all shadow-md shadow-[#FF3E7F]/20 whitespace-nowrap"
            >
              {t('btn')} →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
