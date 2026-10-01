export const PAYMENT_MODES = [
  {
    value: 'outright_cash',
    title: 'Outright Purchase (Cash)',
    description: '100% upfront payment. Maximizes long-term ROI and eliminates interest charges.',
    badge: 'Lowest Lifetime Cost',
  },
  {
    value: 'bank_financing',
    title: 'Solar / Green Bank Loan',
    description: 'Financed via commercial bank solar asset financing (e.g. NCBA, KCB, Equity green loans).',
  },
  {
    value: 'paygo',
    title: 'Pay-As-You-Go (PAYG) / Lease',
    description: 'Flexible monthly subscription or pay-per-use lease agreement with minimal upfront deposit.',
  },
];

export const KPLC_TARIFF_TYPES = [
  {
    value: 'dc_domestic',
    title: 'Domestic Lifeline / Regular (DC)',
    description: 'Standard household residential single-phase or three-phase meter (~KES 28–32 / kWh).',
    badge: 'Residential Default',
  },
  {
    value: 'sc_commercial',
    title: 'Small Commercial (SC1 / SC2)',
    description: 'Shops, commercial premises, and small businesses consuming up to 15,000 kWh/month.',
  },
  {
    value: 'ci_industrial',
    title: 'Commercial & Industrial (CI1 - CI5)',
    description: 'Medium to large industrial operations with time-of-use tariffs and peak demand charges.',
  },
];

export const CURRENCY_OPTIONS = ['KES', 'USD'];