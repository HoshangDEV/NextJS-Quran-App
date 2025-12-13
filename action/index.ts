import {
  SurahsType,
  SurahType,
  TafseerKurdishType,
  TafseerListType,
} from "@/types";
import { API_URLS, TAFSEER_CONFIG } from "@/constants";

type ApiResponse<T> =
  | { status: number; data: T; success: string; error?: never }
  | { status: number; error: string; data?: never; success?: never };

export const GetSurahs = async (): Promise<ApiResponse<SurahsType["data"]>> => {
  try {
    const response = await fetch(`${API_URLS.ALQURAN_CLOUD}/surah`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch surahs: ${response.status}`);
      return {
        status: response.status,
        error: response.status === 404 ? "Surahs not found" : "Failed to fetch surahs",
      };
    }

    const { data } = (await response.json()) as SurahsType;

    return {
      status: response.status,
      data,
      success: "Surahs fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return {
      status: 500,
      error: "Internal server error while fetching surahs",
    };
  }
};

export const GetSurah = async ({
  surahNumber,
}: {
  surahNumber: number;
}): Promise<ApiResponse<SurahType["data"]>> => {
  try {
    const response = await fetch(
      `${API_URLS.ALQURAN_CLOUD}/surah/${surahNumber}/${TAFSEER_CONFIG.ARABIC_ALAFASY_EDITION}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch surah ${surahNumber}: ${response.status}`);
      return {
        status: response.status,
        error: response.status === 404 ? `Surah ${surahNumber} not found` : "Failed to fetch surah",
      };
    }

    const { data } = (await response.json()) as SurahType;

    return {
      status: response.status,
      data,
      success: `Surah ${surahNumber} fetched successfully`,
    };
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return {
      status: 500,
      error: "Internal server error while fetching surah",
    };
  }
};

export const GetTafseerList = async (): Promise<ApiResponse<TafseerListType>> => {
  try {
    const response = await fetch(`${API_URLS.QURAN_TAFSEER}/tafseer`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      console.error(`Failed to fetch tafseer list: ${response.status}`);
      return {
        status: response.status,
        error: "Failed to fetch tafseer list",
      };
    }

    const data = (await response.json()) as TafseerListType;

    return {
      status: response.status,
      data,
      success: "Tafseer list fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching tafseer list:", error);
    return {
      status: 500,
      error: "Internal server error while fetching tafseer list",
    };
  }
};

export const GetKurdishTafseer = async ({
  ayahNumber,
}: {
  ayahNumber: number;
}): Promise<ApiResponse<TafseerKurdishType["data"]>> => {
  try {
    const response = await fetch(
      `${API_URLS.ALQURAN_CLOUD}/ayah/${ayahNumber}/${TAFSEER_CONFIG.KURDISH_EDITION}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch Kurdish tafseer for ayah ${ayahNumber}: ${response.status}`);
      return {
        status: response.status,
        error: `Kurdish tafseer for ayah ${ayahNumber} not found`,
      };
    }

    const { data } = (await response.json()) as TafseerKurdishType;

    return {
      status: response.status,
      data,
      success: `Kurdish tafseer for ayah ${ayahNumber} fetched successfully`,
    };
  } catch (error) {
    console.error(`Error fetching Kurdish tafseer for ayah ${ayahNumber}:`, error);
    return {
      status: 500,
      error: "Internal server error while fetching Kurdish tafseer",
    };
  }
};
