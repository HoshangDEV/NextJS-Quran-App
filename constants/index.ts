// Font configuration
export const FontNames = [
  {
    label: "Amiri Quran",
    value: "amiri-quran",
  },
  {
    label: "Scheherazade New",
    value: "scheherazade-new",
  },
  {
    label: "Noto Naskh Arabic",
    value: "noto-naskh-arabic",
  },
  {
    label: "Noto Kufi Arabic",
    value: "noto-kufi-arabic",
  },
];

// API URLs
export const API_URLS = {
  ALQURAN_CLOUD: "https://api.alquran.cloud/v1",
  QURAN_TAFSEER: "http://api.quran-tafseer.com",
} as const;

// Audio configuration
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 1,
  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
  VOLUME_STORAGE_KEY: "volume",
} as const;

// Tafseer configuration
export const TAFSEER_CONFIG = {
  KURDISH_TAFSEER_ID: 1946,
  KURDISH_EDITION: "ku.asan",
  ARABIC_ALAFASY_EDITION: "ar.alafasy",
} as const;

// UI configuration
export const UI_CONFIG = {
  SCROLL_PROGRESS_COLOR: "#CC3333",
  SCROLL_PROGRESS_HEIGHT: "0.25rem",
} as const;
