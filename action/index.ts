import { API_URLS } from "@/constants";
import { AyahEditionResponse } from "@/types";

type ApiResponse<T> =
  | { status: number; data: T; success: string; error?: never }
  | { status: number; error: string; data?: never; success?: never };

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
      console.error(
        `Failed to fetch tafseer for ayah ${ayahNumber} (${edition}): ${response.status}`
      );
      return {
        status: response.status,
        error:
          response.status === 404
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
