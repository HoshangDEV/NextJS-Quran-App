import SurahComponent from "./_components/surah-component";
import { SURAH_MAP } from "@/data/quran";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const surahNumber = Number(id);

  // Return empty metadata for invalid IDs
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return {};
  }

  const surah = SURAH_MAP[surahNumber];

  if (!surah) {
    return {};
  }

  return {
    title: `${surah.name} - Surah ${surah.number}`,
    description: `Read Surah ${surah.number} (${surah.name}) with ${surah.numberOfAyahs} verses. Listen to audio recitation and read tafseer.`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Validate: must be a number
  const surahNumber = Number(id);
  if (isNaN(surahNumber)) {
    notFound();
  }

  // Validate: must be in valid range (1-114)
  if (surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  // Get surah data
  const surah = SURAH_MAP[surahNumber];
  if (!surah) {
    notFound();
  }

  return (
    <div className="py-8">
      <SurahComponent surah={surah} />
    </div>
  );
}

// Generate static pages for all 114 surahs at build time
export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
}
