export enum DeviceState {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  XLARGE = 3,
  XXLARGE = 4,
  XXXLARGE = 5,
}

export const mediaQueries = {
  SMALL: '(min-width: 480px)',
  MEDIUM: '(min-width: 768px)',
  LARGE: '(min-width: 1024px)',
  XLARGE: '(min-width: 1200px)',
  XXLARGE: '(min-width: 1600px)',
  XXXLARGE: '(min-width: 1920px)',
};
