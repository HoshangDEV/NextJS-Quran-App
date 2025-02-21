import {
  Amiri,
  Amiri_Quran,
  Baloo_Bhaijaan_2,
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Poppins,
  Scheherazade_New,
} from "next/font/google";

export const amiri = Amiri({
  subsets: ["latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

export const amiriQuran = Amiri_Quran({
  subsets: ["latin"],
  variable: "--font-amiri-quran",
  weight: ["400"],
});

export const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  variable: "--font-baloo-bhaijaan-2",
  weight: ["400", "700"],
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["latin"],
  variable: "--font-noto-naskh-arabic",
  weight: ["400"],
});

export const scheherazadeNew = Scheherazade_New({
  subsets: ["latin"],
  variable: "--font-scheherazade-new",
  weight: ["400", "700"],
});

export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["latin"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
