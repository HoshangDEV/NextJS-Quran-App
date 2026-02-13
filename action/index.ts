import { SurahsType, SurahType, AyahEditionResponse } from "@/types";
import { API_URLS, QURAN_AUDIO_EDITION } from "@/constants";

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
      `${API_URLS.ALQURAN_CLOUD}/surah/${surahNumber}/${QURAN_AUDIO_EDITION}`,
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

export const GetTafseer = async ({
  ayahNumber,
  edition,
}: {
  ayahNumber: number;
  edition: string;
}): Promise<ApiResponse<AyahEditionResponse["data"]>> => {
  try {
    const response = await fetch(
      `${API_URLS.ALQURAN_CLOUD}/ayah/${ayahNumber}/${edition}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch tafseer for ayah ${ayahNumber} (${edition}): ${response.status}`);
      return {
        status: response.status,
        error: response.status === 404
          ? `Tafseer for ayah ${ayahNumber} not found`
          : "Failed to fetch tafseer",
      };
    }

    const { data } = (await response.json()) as AyahEditionResponse;

    return {
      status: response.status,
      data,
      success: `Tafseer for ayah ${ayahNumber} fetched successfully`,
    };
  } catch (error) {
    console.error(`Error fetching tafseer for ayah ${ayahNumber}:`, error);
    return {
      status: 500,
      error: "Internal server error while fetching tafseer",
    };
  }
};
