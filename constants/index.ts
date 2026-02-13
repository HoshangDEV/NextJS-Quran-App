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
} as const;

// Audio configuration
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 1,
  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
  VOLUME_STORAGE_KEY: "volume",
} as const;

// Full list of available editions: https://api.alquran.cloud/v1/edition
export const TAFSEER_EDITIONS = {
  kurdish: [
    { identifier: "ku.asan", name: "کوردی", language: "ku" },
  ],
  arabic: [
    { identifier: "ar.muyassar", name: "تفسير المیسر", language: "ar" },
    { identifier: "ar.jalalayn", name: "تفسير الجلالين", language: "ar" },
    { identifier: "ar.qurtubi", name: "تفسير القرطبي", language: "ar" },
    { identifier: "ar.miqbas", name: "تنوير المقباس من تفسير بن عباس", language: "ar" },
    { identifier: "ar.waseet", name: "التفسير الوسيط", language: "ar" },
    { identifier: "ar.baghawi", name: "تفسير البغوي", language: "ar" },
  ],
  english: [
    { identifier: "en.sahih", name: "Saheeh International", language: "en" },
    { identifier: "en.yusufali", name: "Yusuf Ali", language: "en" },
    { identifier: "en.hilali", name: "Hilali & Khan", language: "en" },
    { identifier: "en.pickthall", name: "Pickthall", language: "en" },
    { identifier: "en.itani", name: "Clear Quran", language: "en" },
  ],
} as const;

export const QURAN_AUDIO_EDITION = "ar.alafasy";

// UI configuration
export const UI_CONFIG = {
  SCROLL_PROGRESS_COLOR: "#CC3333",
  SCROLL_PROGRESS_HEIGHT: "0.25rem",
} as const;
