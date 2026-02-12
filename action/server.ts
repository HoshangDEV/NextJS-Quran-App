"use server";

import { TafseerType } from "@/types";
import { API_URLS } from "@/constants";

type TafseerResponse =
  | { status: number; data: TafseerType; success: string; error?: never }
  | { status: number; error: string; data?: never; success?: never };

export const GetTafseer = async ({
  tafseerId,
  surahNumber,
  numberInSurah,
}: {
  tafseerId: number;
  surahNumber: number;
  numberInSurah: number;
}): Promise<TafseerResponse> => {
  try {
    // Validate input parameters
    if (!surahNumber || !numberInSurah || !tafseerId) {
      console.error("Invalid parameters for GetTafseer:", {
        tafseerId,
        surahNumber,
        numberInSurah,
      });
      return {
        status: 400,
        error:
          "Missing required parameters: tafseerId, surahNumber, or numberInSurah",
      };
    }

    // Validate ranges
    if (surahNumber < 1 || surahNumber > 114) {
      return { status: 400, error: "Surah number must be between 1 and 114" };
    }

    const response = await fetch(
      `${API_URLS.QURAN_TAFSEER}/tafseer/${tafseerId}/${surahNumber}/${numberInSurah}`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch tafseer: tafseer=${tafseerId}, surah=${surahNumber}, numberInSurah=${numberInSurah}, status=${response.status}`
      );
      return {
        status: response.status,
        error:
          response.status === 404
            ? "Tafseer not found for this ayah"
            : "Failed to fetch tafseer",
      };
    }

    const data = (await response.json()) as TafseerType;

    return {
      status: response.status,
      data,
      success: "Tafseer fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching tafseer:", error);
    return {
      status: 500,
      error: "Internal server error while fetching tafseer",
    };
  }
};
