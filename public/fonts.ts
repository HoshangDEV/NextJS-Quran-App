import {
  Amiri_Quran,
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Poppins,
  Scheherazade_New,
} from "next/font/google";

export const amiriQuran = Amiri_Quran({
  subsets: ["latin", "arabic"],
  variable: "--font-amiri-quran",
  weight: ["400"],
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["latin", "arabic"],
  variable: "--font-noto-naskh-arabic",
  weight: ["400"],
});

export const scheherazadeNew = Scheherazade_New({
  subsets: ["latin", "arabic"],
  variable: "--font-scheherazade-new",
  weight: ["400"],
});

export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["latin", "arabic"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
