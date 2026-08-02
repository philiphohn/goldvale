export interface DefaultSetting {
  otaShare: number;
  otaCommission: number;
  directCostRate: number;
  openDays: number;
  checkedAt: string;
  source: string;
}

export const PROPERTY_DEFAULTS: Record<'hotel' | 'apartments' | 'villa' | 'property_manager', DefaultSetting> = {
  hotel: {
    otaShare: 0.65,
    otaCommission: 0.15,
    directCostRate: 0.03,
    openDays: 365,
    checkedAt: '2026-08-01',
    source: 'Branchendurchschnitt Hotellerie (unverbindlich)',
  },
  apartments: {
    otaShare: 0.80,
    otaCommission: 0.15,
    directCostRate: 0.03,
    openDays: 210,
    checkedAt: '2026-08-01',
    source: 'Branchendurchschnitt Ferienwohnungen (unverbindlich)',
  },
  villa: {
    otaShare: 0.85,
    otaCommission: 0.15,
    directCostRate: 0.03,
    openDays: 180,
    checkedAt: '2026-08-01',
    source: 'Branchendurchschnitt Ferienhäuser & Villen (unverbindlich)',
  },
  property_manager: {
    otaShare: 0.75,
    otaCommission: 0.15,
    directCostRate: 0.035,
    openDays: 365,
    checkedAt: '2026-08-01',
    source: 'Branchendurchschnitt Property Management (unverbindlich)',
  },
};
