export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  STAKING: '/staking',
  VOTING: '/voting',
  WALLET: '/wallet',
  ABOUT: '/about',
  KYC: '/kyc',
  DEFINE_PROJECT: '/projects/define',
  PROJECT_DETAILS: '/projects/:id',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DEFINE_PROJECT,
  ROUTES.VOTING,
  ROUTES.STAKING,
] as const; 