export type Surah = {
  number: number;
  name: string;
  ayahs: {
    numberInSurah: number;
    text: string;
  }[];
};

export type Surahs = {
  number: number;
  name: string;
}[];
