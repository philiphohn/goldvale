import { calculate } from './calc';

function assertNear(actual: number, expected: number, delta: number = 0.5, message?: string) {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`${message || 'Assertion failed'}: expected near ${expected}, got ${actual}`);
  }
}

function runTests() {
  console.log('Running OTA Calculator tests...');

  // Test 1: Hotel, ganzjährig
  const t1 = calculate({
    units: 20,
    openDays: 365,
    occupancyMode: 'nights',
    nightsPerUnit: 120,
    adr: 140,
    otaShare: 0.70,
    otaCommission: 0.17,
    directCostRate: 0.03,
    shiftPoints: 10,
    hasBookingEngine: true,
    hasChannelManager: true,
    propertyType: 'hotel',
  });
  assertNear(t1.nights, 2400, 0.1, 'Test 1 nights');
  assertNear(t1.grossRevenue, 336000, 1, 'Test 1 grossRevenue');
  assertNear(t1.otaRevenue, 235200, 1, 'Test 1 otaRevenue');
  assertNear(t1.annualCommission, 39984, 1, 'Test 1 annualCommission');
  assertNear(t1.commissionPerMonth, 3332, 1, 'Test 1 commissionPerMonth');
  assertNear(t1.grossSaving, 5712, 1, 'Test 1 grossSaving');
  assertNear(t1.netSaving, 4704, 1, 'Test 1 netSaving');
  assertNear(t1.netSaving3y, 14112, 1, 'Test 1 netSaving3y');
  if (t1.amortizationCategory !== 'under_18') {
    throw new Error(`Test 1 category failed: expected under_18, got ${t1.amortizationCategory}`);
  }
  console.log('✓ Test 1 passed (Hotel, ganzjährig)');

  // Test 2: 3 Apartments, saisonal
  const t2 = calculate({
    units: 3,
    openDays: 200,
    occupancyMode: 'rate',
    occupancyRate: 0.70,
    adr: 110,
    otaShare: 0.85,
    otaCommission: 0.16,
    directCostRate: 0.03,
    shiftPoints: 10,
    hasBookingEngine: false,
    hasChannelManager: false,
    propertyType: 'apartments',
  });
  assertNear(t2.nights, 420, 0.1, 'Test 2 nights');
  assertNear(t2.grossRevenue, 46200, 1, 'Test 2 grossRevenue');
  assertNear(t2.annualCommission, 6283.20, 1, 'Test 2 annualCommission');
  assertNear(t2.netSaving, 600.60, 1, 'Test 2 netSaving');
  assertNear(t2.netSaving3y, 1801.80, 1, 'Test 2 netSaving3y');
  if (t2.tier.low !== 900 || t2.tier.high !== 1200) {
    throw new Error('Test 2 tier failed');
  }
  console.log('✓ Test 2 passed (3 Apartments, saisonal)');

  // Test 3: 4 Apartments, kurze Saison (Ehrlichkeitsfall)
  const t3 = calculate({
    units: 4,
    openDays: 180,
    occupancyMode: 'rate',
    occupancyRate: 0.65,
    adr: 95,
    otaShare: 0.85,
    otaCommission: 0.16,
    directCostRate: 0.03,
    shiftPoints: 10,
    hasBookingEngine: false,
    hasChannelManager: false,
    propertyType: 'apartments',
  });
  assertNear(t3.nights, 468, 0.1, 'Test 3 nights');
  assertNear(t3.grossRevenue, 44460, 1, 'Test 3 grossRevenue');
  assertNear(t3.annualCommission, 6046.56, 1, 'Test 3 annualCommission');
  assertNear(t3.netSaving, 577.98, 1, 'Test 3 netSaving');
  console.log('✓ Test 3 passed (4 Apartments, Ehrlichkeitsfall)');

  // Test 4: Property Manager
  const t4 = calculate({
    units: 45,
    openDays: 365,
    occupancyMode: 'rate',
    occupancyRate: 0.55,
    adr: 120,
    otaShare: 0.75,
    otaCommission: 0.18,
    directCostRate: 0.035,
    shiftPoints: 10,
    hasBookingEngine: true,
    hasChannelManager: true,
    propertyType: 'property_manager',
  });
  assertNear(t4.nights, 9033.75, 0.5, 'Test 4 nights');
  assertNear(t4.grossRevenue, 1084050, 10, 'Test 4 grossRevenue');
  assertNear(t4.annualCommission, 146346.75, 10, 'Test 4 annualCommission');
  assertNear(t4.netSaving, 15718.725, 10, 'Test 4 netSaving');
  assertNear(t4.netSaving3y, 47156.175, 10, 'Test 4 netSaving3y');
  if (!t4.tier.custom) throw new Error('Test 4 expected custom tier');
  assertNear(t4.tier.orientativeBudget!, 23578, 10, 'Test 4 budget');
  console.log('✓ Test 4 passed (Property Manager)');

  // Test 5: Kappung
  const t5 = calculate({
    units: 10,
    openDays: 365,
    occupancyMode: 'rate',
    occupancyRate: 0.50,
    adr: 100,
    otaShare: 0.08,
    otaCommission: 0.17,
    directCostRate: 0.03,
    shiftPoints: 20,
    hasBookingEngine: false,
    hasChannelManager: false,
    propertyType: 'hotel',
  });
  if (t5.shift !== 0.08) {
    throw new Error(`Test 5 failed: expected shift 0.08, got ${t5.shift}`);
  }
  if (!t5.warnings.includes('shiftCapped')) {
    throw new Error('Test 5 failed: expected warning shiftCapped');
  }
  console.log('✓ Test 5 passed (Kappung)');

  // Test 6: Grenzfall
  const t6 = calculate({
    units: 5,
    openDays: 365,
    occupancyMode: 'rate',
    occupancyRate: 0.50,
    adr: 100,
    otaShare: 0.80,
    otaCommission: 0.03,
    directCostRate: 0.03,
    shiftPoints: 10,
    hasBookingEngine: false,
    hasChannelManager: false,
    propertyType: 'hotel',
  });
  if (t6.netSaving !== 0) {
    throw new Error(`Test 6 failed: expected netSaving 0, got ${t6.netSaving}`);
  }
  if (!t6.warnings.includes('directCostHigh')) {
    throw new Error('Test 6 failed: expected warning directCostHigh');
  }
  console.log('✓ Test 6 passed (Grenzfall)');

  console.log('All 6 tests passed successfully!');
}

runTests();
