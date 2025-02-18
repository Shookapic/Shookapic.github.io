export type CountryCode = 
  | 'US'
  | 'FR'
  | 'CN'
  | 'GB'
  | 'DE'
  | 'JP'
  | 'CA'
  | 'AU'
  | 'IT'
  | 'ES';

export const countryNameRecord: Record<CountryCode, string> = {
  US: 'United States',
  FR: 'France',
  CN: 'China',
  GB: 'United Kingdom',
  DE: 'Germany',
  JP: 'Japan',
  CA: 'Canada',
  AU: 'Australia',
  IT: 'Italy',
  ES: 'Spain'
};
