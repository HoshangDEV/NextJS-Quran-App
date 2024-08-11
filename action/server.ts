"use server";

import { TafseerType } from "@/types";

export const GetTafseer = async ({
  tafseerId,
  surahNumber,
  ayahNumber,
}: {
  tafseerId: number;
  surahNumber: number;
  ayahNumber: number;
}) => {
  try {
    if (!surahNumber || !ayahNumber)
      return { status: 400, error: "Bad Request" };

    const response = await fetch(
      `http://api.quran-tafseer.com/tafseer/${tafseerId}/${surahNumber}/${ayahNumber}`
    );

    if (response.status !== 200)
      return { status: response.status, error: "Not Found" };

    const data = (await response.json()) as TafseerType;

    return {
      status: response.status,
      data,
      success: "Data fetched successfully",
    };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};
