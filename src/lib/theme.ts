export const colors = {
  primary: {
    main: '#84a59d',
    light: '#a3bdb5',
    dark: '#6a8680',
  },
  accent: {
    main: '#f6bd60',
    light: '#f8cd80',
    dark: '#d4a34d',
  },
  coral: {
    main: '#f28482',
    light: '#f5a3a1',
    dark: '#d96c6a',
  },
  cream: '#f7ede2',
  blush: '#f5cac3',
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
} as const

export type ColorName = keyof typeof colors