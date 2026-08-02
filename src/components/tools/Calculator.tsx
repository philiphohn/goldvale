'use client';

import React, { useState, useEffect, useTransition, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculate, CalcInput, PropertyType } from '@/lib/ota/calc';
import { PROPERTY_DEFAULTS } from '@/lib/ota/defaults';

interface CalculatorProps {
  initialParams?: Record<string, string>;
}

export default function Calculator({ initialParams }: CalculatorProps) {
  const t = useTranslations('otaTool');

  // State
  const [propertyType, setPropertyType] = useState<PropertyType>('apartments');
  const [units, setUnits] = useState<number>(6);
  const [openDays, setOpenDays] = useState<number>(210);
  const [occupancyMode, setOccupancyMode] = useState<'rate' | 'nights'>('rate');
  const [occupancyRate, setOccupancyRate] = useState<number>(0.65);
  const [nightsPerUnit, setNightsPerUnit] = useState<number>(140);
  const [adr, setAdr] = useState<number>(120);
  const [otaShare, setOtaShare] = useState<number>(0.75);
  const [otaCommission, setOtaCommission] = useState<number>(0.15);
  const [directCostRate, setDirectCostRate] = useState<number>(0.03);
  const [shiftPoints, setShiftPoints] = useState<number>(10);
  const [hasBookingEngine, setHasBookingEngine] = useState<boolean>(false);
  const [hasChannelManager, setHasChannelManager] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [manuallyModified, setManuallyModified] = useState<Record<string, boolean>>({});

  // Sync initial query params if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('units')) setUnits(Number(searchParams.get('units')));
      if (searchParams.has('openDays')) setOpenDays(Number(searchParams.get('openDays')));
      if (searchParams.has('adr')) setAdr(Number(searchParams.get('adr')));
      if (searchParams.has('occ')) setOccupancyRate(Number(searchParams.get('occ')));
      if (searchParams.has('ota')) setOtaShare(Number(searchParams.get('ota')));
      if (searchParams.has('com')) setOtaCommission(Number(searchParams.get('com')));
      if (searchParams.has('type')) setPropertyType(searchParams.get('type') as PropertyType);
      if (searchParams.has('shift')) setShiftPoints(Number(searchParams.get('shift')));
    }
  }, []);

  // Handle PropertyType change and apply defaults for untouched fields
  const handlePropertyTypeChange = (newType: PropertyType) => {
    setPropertyType(newType);
    const defaults = PROPERTY_DEFAULTS[newType];
    if (!manuallyModified.openDays) setOpenDays(defaults.openDays);
    if (!manuallyModified.otaShare) setOtaShare(defaults.otaShare);
    if (!manuallyModified.otaCommission) setOtaCommission(defaults.otaCommission);
    if (!manuallyModified.directCostRate) setDirectCostRate(defaults.directCostRate);
  };

  // Perform Calculation
  const calcInput: CalcInput = useMemo(() => ({
    units,
    openDays,
    occupancyMode,
    occupancyRate,
    nightsPerUnit,
    adr,
    otaShare,
    otaCommission,
    directCostRate,
    shiftPoints,
    hasBookingEngine,
    hasChannelManager,
    propertyType,
  }), [
    units, openDays, occupancyMode, occupancyRate, nightsPerUnit,
    adr, otaShare, otaCommission, directCostRate, shiftPoints,
    hasBookingEngine, hasChannelManager, propertyType,
  ]);

  const result = useMemo(() => calculate(calcInput), [calcInput]);

  // Animated Count-Up for Card 1
  const [animatedCommission, setAnimatedCommission] = useState<number>(result.annualCommission);

  useEffect(() => {
    const target = result.annualCommission;
    const duration = 400;
    const steps = 20;
    const stepTime = duration / steps;
    const diff = target - animatedCommission;
    if (Math.abs(diff) < 1) {
      setAnimatedCommission(target);
      return;
    }
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedCommission((prev) => {
        if (currentStep >= steps) {
          clearInterval(interval);
          return target;
        }
        return prev + diff / steps;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [result.annualCommission]);

  // Share URL handler
  const handleShare = () => {
    const params = new URLSearchParams({
      units: units.toString(),
      openDays: openDays.toString(),
      adr: adr.toString(),
      occ: occupancyRate.toString(),
      ota: otaShare.toString(),
      com: otaCommission.toString(),
      type: propertyType,
      shift: shiftPoints.toString(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(val));
  };

  return (
    <div className="w-full bg-[#14161A] text-[#F3F4F6] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#262930] shadow-2xl space-y-10" id="calculator-tool">
      
      {/* 1. Property Type Selector */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-3 font-mono">
          {t('fields.property_type_label')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(['apartments', 'hotel', 'villa', 'property_manager'] as PropertyType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handlePropertyTypeChange(type)}
              className={`py-3 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all duration-200 text-center ${
                propertyType === type
                  ? 'bg-[#FF3E7F] text-white border-[#FF3E7F] shadow-lg shadow-[#FF3E7F]/20'
                  : 'bg-[#1C1F26] text-[#D1D5DB] border-[#2E333D] hover:border-[#4B5563]'
              }`}
            >
              {t(`property_types.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Units */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.units_label')}</label>
            <input
              type="number"
              min={1}
              max={500}
              value={units}
              onChange={(e) => {
                setUnits(Number(e.target.value));
                setManuallyModified((prev) => ({ ...prev, units: true }));
              }}
              className="w-20 bg-[#1C1F26] border border-[#2E333D] rounded-lg px-2.5 py-1 text-right text-sm font-mono text-[#FF3E7F] focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>
          <input
            type="range"
            min={1}
            max={50}
            value={units}
            onChange={(e) => {
              setUnits(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, units: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Operating Days */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.open_days_label')}</label>
            <input
              type="number"
              min={30}
              max={365}
              value={openDays}
              onChange={(e) => {
                setOpenDays(Number(e.target.value));
                setManuallyModified((prev) => ({ ...prev, openDays: true }));
              }}
              className="w-20 bg-[#1C1F26] border border-[#2E333D] rounded-lg px-2.5 py-1 text-right text-sm font-mono text-[#FF3E7F] focus:outline-none focus:border-[#FF3E7F]"
            />
          </div>
          <input
            type="range"
            min={30}
            max={365}
            step={5}
            value={openDays}
            onChange={(e) => {
              setOpenDays(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, openDays: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Occupancy Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.occupancy_rate_label')}</label>
            <span className="font-mono text-sm text-[#FF3E7F]">{Math.round(occupancyRate * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.10}
            max={0.95}
            step={0.05}
            value={occupancyRate}
            onChange={(e) => {
              setOccupancyRate(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, occupancyRate: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* ADR */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.adr_label')}</label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min={20}
                max={2000}
                value={adr}
                onChange={(e) => {
                  setAdr(Number(e.target.value));
                  setManuallyModified((prev) => ({ ...prev, adr: true }));
                }}
                className="w-24 bg-[#1C1F26] border border-[#2E333D] rounded-lg px-2.5 py-1 text-right text-sm font-mono text-[#FF3E7F] focus:outline-none focus:border-[#FF3E7F]"
              />
              <span className="text-xs text-[#9CA3AF]">€</span>
            </div>
          </div>
          <input
            type="range"
            min={40}
            max={600}
            step={5}
            value={adr}
            onChange={(e) => {
              setAdr(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, adr: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* OTA Share */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.ota_share_label')}</label>
            <span className="font-mono text-sm text-[#FF3E7F]">{Math.round(otaShare * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.10}
            max={1.0}
            step={0.05}
            value={otaShare}
            onChange={(e) => {
              setOtaShare(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, otaShare: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* OTA Commission */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label className="text-[#D1D5DB] font-medium">{t('fields.ota_commission_label')}</label>
            <span className="font-mono text-sm text-[#FF3E7F]">{Math.round(otaCommission * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={0.30}
            step={0.01}
            value={otaCommission}
            onChange={(e) => {
              setOtaCommission(Number(e.target.value));
              setManuallyModified((prev) => ({ ...prev, otaCommission: true }));
            }}
            className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
          />
        </div>

      </div>

      {/* Advanced Options Toggle */}
      <div className="border-t border-[#262930] pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs uppercase tracking-wider text-[#9CA3AF] hover:text-white flex items-center gap-2 font-mono"
        >
          <span>{showAdvanced ? '− ' + t('fields.less_options') : '+ ' + t('fields.more_options')}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#1C1F26] rounded-xl border border-[#2E333D]">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-[#D1D5DB] font-medium">{t('fields.direct_cost_label')}</label>
                <span className="font-mono text-sm text-[#FF3E7F]">{(directCostRate * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.08}
                step={0.005}
                value={directCostRate}
                onChange={(e) => {
                  setDirectCostRate(Number(e.target.value));
                  setManuallyModified((prev) => ({ ...prev, directCostRate: true }));
                }}
                className="w-full accent-[#FF3E7F] bg-[#2E333D] h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col justify-center space-y-3">
              <label className="flex items-center space-x-3 text-sm text-[#D1D5DB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBookingEngine}
                  onChange={(e) => setHasBookingEngine(e.target.checked)}
                  className="rounded border-[#2E333D] bg-[#14161A] text-[#FF3E7F] focus:ring-0 w-4 h-4"
                />
                <span>{t('fields.has_booking_engine')}</span>
              </label>
              <label className="flex items-center space-x-3 text-sm text-[#D1D5DB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasChannelManager}
                  onChange={(e) => setHasChannelManager(e.target.checked)}
                  className="rounded border-[#2E333D] bg-[#14161A] text-[#FF3E7F] focus:ring-0 w-4 h-4"
                />
                <span>{t('fields.has_channel_manager')}</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="space-y-2">
          {result.warnings.map((warn) => (
            <div key={warn} className="p-3 bg-[#3B2514] border border-[#B45309] text-[#FDE68A] text-xs rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{t(`warnings.${warn}`)}</span>
            </div>
          ))}
        </div>
      )}

      {/* 3. Scenario Selector */}
      <div className="border-t border-[#262930] pt-6 space-y-3">
        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-mono">
          {t('scenarios.label')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[5, 10, 15, 20].map((pts) => (
            <button
              key={pts}
              type="button"
              onClick={() => setShiftPoints(pts)}
              className={`py-2.5 px-3 text-xs font-mono rounded-xl border transition-all ${
                shiftPoints === pts
                  ? 'bg-[#FF3E7F]/10 border-[#FF3E7F] text-[#FF3E7F] font-bold'
                  : 'bg-[#1C1F26] border-[#2E333D] text-[#9CA3AF] hover:text-white'
              }`}
            >
              {t(`scenarios.points_${pts}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Results Section (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4" aria-live="polite">
        
        {/* Card 1: Annual Commission (Signature Element) */}
        <div className="bg-[#1C1F26] p-6 rounded-2xl border border-[#FF3E7F]/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3E7F] to-[#FF85A2]" />
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#9CA3AF]">
              {t('results.card1_title')}
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#FF3E7F] font-mono tabular-nums my-3 tracking-tight">
              {formatCurrency(animatedCommission)} €
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] font-mono">
            {t('results.card1_sub', { monthly: formatCurrency(result.commissionPerMonth) })}
          </p>
        </div>

        {/* Card 2: Estimated Net Savings / Year */}
        <div className="bg-[#1C1F26] p-6 rounded-2xl border border-[#2E333D] flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#9CA3AF]">
              {t('results.card2_title')}
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-[#10B981] font-mono tabular-nums my-3">
              {formatCurrency(result.netSaving)} €
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] font-mono">
            {t('results.card2_sub', { points: Math.round(result.shift * 100) })}
          </p>
        </div>

        {/* Card 3: 3-Year Effect */}
        <div className="bg-[#1C1F26] p-6 rounded-2xl border border-[#2E333D] flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#9CA3AF]">
              {t('results.card3_title')}
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums my-3">
              {formatCurrency(result.netSaving3y)} €
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] font-mono">
            {t('results.card3_sub')}
          </p>
        </div>

        {/* Card 4: Recommended Package & Payback */}
        <div className="bg-[#1C1F26] p-6 rounded-2xl border border-[#2E333D] flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#9CA3AF]">
              {t('results.card4_title')}
            </span>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono my-2">
              {result.tier.custom ? (
                t('results.custom_budget', { amount: formatCurrency(result.tier.orientativeBudget || 0) })
              ) : (
                t('results.tier_range', { low: result.tier.low ?? 0, high: result.tier.high ?? 0 })
              )}
            </div>
            {result.paybackHigh && result.paybackLow && (
              <p className="text-xs text-[#FF3E7F] font-mono">
                {t('results.payback_months', {
                  low: result.paybackLow.toFixed(1),
                  high: result.paybackHigh.toFixed(1),
                })}
              </p>
            )}
          </div>
          
          <div className="text-xs text-[#D1D5DB] bg-[#14161A] p-3 rounded-xl border border-[#262930] leading-relaxed">
            {t(`amortization.${result.amortizationCategory}`)}
          </div>
        </div>

      </div>

      {/* Recommendation Box */}
      <div className="p-5 bg-[#1C1F26] rounded-2xl border-l-4 border-l-[#FF3E7F] border-y border-r border-[#2E333D] text-sm leading-relaxed text-[#D1D5DB]">
        <strong className="text-white block mb-1">Empfehlung für Ihren Betrieb:</strong>
        {t(`recommendations.${result.recommendationKey}`)}
      </div>

      {/* Disclaimers & Share Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#9CA3AF] border-t border-[#262930] pt-6 font-mono">
        <p className="max-w-xl text-[11px] leading-normal">
          {t('disclaimers.estimation')} {t('disclaimers.pricing')}
        </p>
        <button
          type="button"
          onClick={handleShare}
          className="shrink-0 py-2 px-4 rounded-xl bg-[#262930] text-white hover:bg-[#323640] transition-colors flex items-center gap-2"
        >
          <span>🔗</span>
          <span>{copied ? t('share.copied') : t('share.btn')}</span>
        </button>
      </div>

    </div>
  );
}
