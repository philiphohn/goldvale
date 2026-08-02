export type PropertyType = 'hotel' | 'apartments' | 'villa' | 'property_manager';

export interface CalcInput {
  units: number;
  openDays: number;
  occupancyMode: 'rate' | 'nights';
  occupancyRate?: number;
  nightsPerUnit?: number;
  adr: number;
  otaShare: number;
  otaCommission: number;
  directCostRate: number;
  shiftPoints: number;
  hasBookingEngine: boolean;
  hasChannelManager: boolean;
  propertyType: PropertyType;
}

export interface PriceTierResult {
  low?: number;
  high?: number;
  custom?: boolean;
  orientativeBudget?: number;
}

export interface CalcResult {
  units: number;
  openDays: number;
  nights: number;
  grossRevenue: number;
  otaRevenue: number;
  annualCommission: number;
  commissionPerMonth: number;
  shift: number;
  grossSaving: number;
  netSaving: number;
  netSaving3y: number;
  savingPerMonth: number;
  tier: PriceTierResult;
  paybackLow?: number;
  paybackHigh?: number;
  amortizationCategory: 'under_18' | '19_36' | '37_60' | 'not_recommended';
  recommendationKey: string;
  warnings: string[];
}

export function priceTier(units: number, propertyType: PropertyType): PriceTierResult {
  if (propertyType === 'property_manager' || units > 30) {
    return { custom: true };
  }
  if (propertyType === 'hotel' || units >= 4) {
    return { low: 2000, high: 3000 };
  }
  return { low: 900, high: 1200 };
}

export function calculate(input: CalcInput): CalcResult {
  const warnings: string[] = [];

  // Clamp basic inputs
  const units = Math.max(1, Math.min(500, input.units));
  const openDays = Math.max(30, Math.min(365, input.openDays));
  const adr = Math.max(20, Math.min(2000, input.adr));
  const otaShare = Math.max(0, Math.min(1, input.otaShare));
  const otaCommission = Math.max(0, Math.min(1, input.otaCommission));
  const directCostRate = Math.max(0, Math.min(1, input.directCostRate));

  if (otaCommission > 0.30) {
    warnings.push('otaCommissionHigh');
  }

  let occupancyRate = input.occupancyRate ?? 0;
  if (input.occupancyMode === 'rate') {
    occupancyRate = Math.max(0.05, Math.min(0.95, occupancyRate));
    if (occupancyRate > 0.85 && openDays === 365) {
      warnings.push('occupancyHigh');
    }
  }

  // Calculate nights
  const nights = input.occupancyMode === 'nights'
    ? units * (input.nightsPerUnit ?? 0)
    : units * openDays * occupancyRate;

  const grossRevenue = nights * adr;
  const otaRevenue = grossRevenue * otaShare;
  const annualCommission = otaRevenue * otaCommission;
  const commissionPerMonth = annualCommission / 12;

  // Shift & savings
  let shift = input.shiftPoints / 100;
  if (shift > otaShare) {
    shift = otaShare;
    warnings.push('shiftCapped');
  }

  let grossSaving = 0;
  let netSaving = 0;

  if (directCostRate >= otaCommission) {
    warnings.push('directCostHigh');
    grossSaving = 0;
    netSaving = 0;
  } else {
    grossSaving = grossRevenue * shift * otaCommission;
    netSaving = grossRevenue * shift * (otaCommission - directCostRate);
  }

  const netSaving3y = netSaving * 3;
  const savingPerMonth = netSaving > 0 ? netSaving / 12 : 0;

  // Price Tier
  const tier = priceTier(units, input.propertyType);

  if (tier.custom) {
    tier.orientativeBudget = netSaving * 1.5;
  }

  let paybackLow: number | undefined;
  let paybackHigh: number | undefined;

  if (savingPerMonth > 0) {
    if (tier.low) paybackLow = tier.low / savingPerMonth;
    if (tier.high) paybackHigh = tier.high / savingPerMonth;
  }

  // Amortization Category
  let amortizationCategory: 'under_18' | '19_36' | '37_60' | 'not_recommended' = 'not_recommended';

  if (netSaving <= 0 || savingPerMonth <= 0) {
    amortizationCategory = 'not_recommended';
  } else if (tier.custom) {
    amortizationCategory = 'under_18'; // Standard reference for custom budget orientative calculation
  } else {
    const maxPayback = paybackHigh ?? paybackLow ?? 999;
    if (maxPayback <= 18) {
      amortizationCategory = 'under_18';
    } else if (maxPayback <= 36) {
      amortizationCategory = '19_36';
    } else if (maxPayback <= 60) {
      amortizationCategory = '37_60';
    } else {
      amortizationCategory = 'not_recommended';
    }
  }

  // Recommendation logic
  let recommendationKey = '';
  if (input.propertyType === 'property_manager' || units > 30) {
    recommendationKey = 'rec_pm_over_30';
  } else if (input.propertyType === 'hotel' || (units >= 11 && units <= 30)) {
    recommendationKey = 'rec_hotel_11_30';
  } else if (units >= 4 && units <= 10) {
    if (input.hasChannelManager) {
      recommendationKey = 'rec_units_4_10_has_cm';
    } else {
      recommendationKey = 'rec_units_4_10_no_cm';
    }
  } else {
    recommendationKey = 'rec_units_1_3_no_engine';
  }

  return {
    units,
    openDays,
    nights,
    grossRevenue,
    otaRevenue,
    annualCommission,
    commissionPerMonth,
    shift,
    grossSaving,
    netSaving,
    netSaving3y,
    savingPerMonth,
    tier,
    paybackLow,
    paybackHigh,
    amortizationCategory,
    recommendationKey,
    warnings,
  };
}
