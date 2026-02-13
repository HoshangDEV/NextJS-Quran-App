export type SurahType = {
  data: {
    number: number;
    name: string;
    numberOfAyahs: number;
    ayahs: {
      number: number;
      numberInSurah: number;
      text: string;
      audio: string;
    }[];
  };
};

export type SurahsType = {
  data: {
    number: number;
    name: string;
  }[];
};

export type EditionItem = {
  identifier: string;
  name: string;
  language: "ku" | "ar" | "en";
};

export type AyahEditionResponse = {
  data: {
    text: string;
    edition: EditionItem;
  };
};
