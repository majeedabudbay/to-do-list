export const VALID_CATEGORIES = ['pet', 'personal', 'selfcare', 'shop', 'work'] as const;

export type Category = typeof VALID_CATEGORIES[number]; 