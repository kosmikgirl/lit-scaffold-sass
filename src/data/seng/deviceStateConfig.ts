export enum DeviceState {
  TABLET_PORTRAIT = 0,
  TABLET_LANDSCAPE = 1,
  DESKTOP_MIN = 2,
  DESKTOP_MID = 3,
  DESKTOP_MAX = 4,
}

export const mediaQueries = {
  TABLET_PORTRAIT: '(min-width: 768px)',
  TABLET_LANDSCAPE: '(min-width: 1024px)',
  DESKTOP_MIN: '(min-width: 1200px)',
  DESKTOP_MID: '(min-width: 1600px)',
  DESKTOP_MAX: '(min-width: 1920px)',
};
