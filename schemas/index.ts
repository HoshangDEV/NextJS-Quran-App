export type SurahType = {
  number: number;
  name: string;
  ayahs: {
    numberInSurah: number;
    text: string;
    audio: string;
  }[];
};

export type SurahsType = {
  number: number;
  name: string;
}[];
