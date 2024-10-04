export type SurahType = {
  data: {
    number: number;
    name: string;
    numberOfAyahs: number;
    ayahs: {
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

export type TafseerListType = {
  id: number;
  name: string;
  language: string;
  author: string;
  book_name: string;
}[];

export type TafseerType = {
  tafseer_id: number;
  tafseer_name: string;
  ayah_url: string;
  ayah_number: number;
  text: string;
};

export type TafseerKurdishType = {
  data: {
    text: string;
  };
};
