export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface SurahDetail extends Surah {
  ayat: Ayat[];
  suratSelanjutnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
  suratSebelumnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
}

export interface TafsirDetail extends SurahDetail {
  tafsir: Tafsir[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}