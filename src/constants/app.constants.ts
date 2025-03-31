const PREFIX_KEY = 'aster_ai_';

export enum LocalStorageKey {
  UI_THEME = PREFIX_KEY + 'ui_theme',
  ACCESS_TOKEN = PREFIX_KEY + 'access_token',
}

export enum SearchParamKey {
  SCREEN_HINT = 'screen_hint',
  REF_CODE = 'ref_code',
}

export const SECOND_PER_DAY = 60 * 60 * 24;
